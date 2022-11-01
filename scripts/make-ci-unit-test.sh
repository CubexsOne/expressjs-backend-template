#!/bin/bash

echo "Running unit-tests..."
docker compose up backend-ci-unit-tests
docker compose down