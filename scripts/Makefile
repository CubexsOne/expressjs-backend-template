.PHONY: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

prepare: ## Prepare deployment
	$(eval export COMMAND := ./make-eval-version.sh)

deploy-prod: ## Prepare env variables and deploy to production
	$(eval export NAMESPACE := prjctns)
	$(eval export ENVIRONMENT := production)
	@make deploy

deploy-int: ## Prepare env variables and deploy to integration
	$(eval export NAMESPACE := prjctns-int)
	$(eval export ENVIRONMENT := integration)
	@make deploy

deploy: ## Initial / Update files
	$(eval export COMMAND := ./make-eval-version.sh)
	${COMMAND} ${ENVIRONMENT} deployment.yaml | kubectl -n ${NAMESPACE} apply -f -
	${COMMAND} ${ENVIRONMENT} service.yaml | kubectl -n ${NAMESPACE} apply -f -