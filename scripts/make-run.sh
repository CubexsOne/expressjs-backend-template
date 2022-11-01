#!/bin/bash

echo "Starting backend..."
docker rm -f local-backend-1 || true
docker compose up backend-run
echo "Stopping backend..."
docker compose down