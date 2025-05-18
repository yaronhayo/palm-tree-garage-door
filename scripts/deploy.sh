#!/bin/bash

# Exit on error
set -e

echo "Installing dependencies..."
pnpm install

echo "Adding critters dependency explicitly..."
pnpm add critters@0.0.20

echo "Building the application..."
pnpm run build

echo "Deployment complete!"
