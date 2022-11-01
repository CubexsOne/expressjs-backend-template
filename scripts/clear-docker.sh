#!/bin/bash

docker rmi $(docker images | grep harbor.cubexs.dev/prjctrepo | awk '{print $3}') --force || true