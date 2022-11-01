#!/bin/bash

echo "Running unit-tests..."
docker compose up backend-unit-tests
docker compose down