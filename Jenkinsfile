#!groovy
def buildNumber = env.BUILD_NUMBER as int
if (buildNumber > 1) milestone(buildNumber - 1)
milestone(buildNumber)

pipeline {
  agent any
  
  environment {
    HOME = "${WORKSPACE}"
  }

  stages {
    stage("Prepare") {
      steps {
        dockerLogin()
        dir("scripts") {
          sh "./create-docker-network.sh"
        }
      }
    }

    stage("Test") {
      steps {
        makeTest()
      }
    }

    stage("Build") {
      steps {
        retry(5) {
          makeBuild()
        }
      }
    }

    stage("Publish") {
      steps {
        makePublish()
      }
    }

    stage("Deploy to K8s [INT]") {
      when {
        beforeAgent true
        anyOf {
            branch "main"; branch "feature/*";
        }
      }
      steps {
        dir("scripts") {
          withCredentials([file(credentialsId: 'k8s-config', variable: 'KUBECONFIG')]) {
            sh "make deploy-int"
          }
        }
      }
    }

    stage("Deploy to K8s [PROD]") {
      when {
        beforeAgent true
        anyOf {
          branch "production"; branch "hotfix/*";
        }
      }
      steps {
        dir("scripts") {
          withCredentials([file(credentialsId: 'k8s-config', variable: 'KUBECONFIG')]) {
              sh "make deploy-prod"
          }
        }
      }
    }
  }

  post {
    always {
      dockerLogout()
      clearDocker()
      cleanWs notFailBuild: true
    }
  }
}

def dockerLogin() {
  withCredentials([usernamePassword(credentialsId: '<HARBOR_CREDENTIALS>', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
    sh "echo $PASSWORD | docker login harbor.cubexs.dev -u $USERNAME --password-stdin"
  }
}

def dockerLogout() {
  sh "docker logout harbor.cubexs.dev"
}

def clearDocker() {
  dir("scripts") {
    sh "./clear-docker.sh"
  }
}

def makeTest() {
  timeout(time: 10, unit: 'MINUTES') {
    def status = sh returnStatus: true, script: "make test-ci"
    junit "junit.xml"
    if (status != 0) {
      error("Exited with non-zero status (test or lint fail)")
    }
    sh returnStatus: true, script: "rm junit.xml"
  }
}

def makeBuild() {
  timeout(time: 15, unit: 'MINUTES') {
    sh "make build"
  }
}

def makePublish() {
  timeout(time: 10, unit: 'MINUTES') {
    sh "make publish"
  }
}