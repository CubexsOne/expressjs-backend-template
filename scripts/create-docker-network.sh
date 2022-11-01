#!/bin/bash

docker network ls | grep local_prjctnet
if [ $? -eq 1 ]; then
    docker network create local_prjctnet
fi;