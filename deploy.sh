#!/bin/bash

# Run linting
echo "Running linting..."
npm run lint

# Run build
echo "Building project..."
npm run build

# Run sitemap generation
echo "Generating sitemap..."
npm run postbuild

# Push to main branch
echo "Pushing to main branch..."
git add .
git commit -m "Deploy: $(date)"
git push origin main

echo "Deployment pushed to Vercel. Check build status at https://vercel.com/dashboard"
