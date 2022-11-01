#!/bin/bash

# Parameter
environment=$1
templatefile=$2

# Prepare
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
version=$(git rev-parse HEAD)

# Action
VERSION=$version envsubst < $DIR/../deployment/$environment/$templatefile