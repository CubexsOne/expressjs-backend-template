#!/bin/bash

registry=harbor.cubexs.dev/prjctrepo/backend
version=$(git rev-parse HEAD)

echo "Create new version tag"
docker tag $registry:latest $registry:$version

echo "Push new tags to registry"
docker push $registry
docker push $registry:$version