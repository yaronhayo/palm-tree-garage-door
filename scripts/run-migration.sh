#!/bin/bash

# Run the import finder to check for any remaining imports
echo "Checking for imports of deprecated files..."
npx ts-node scripts/find-deprecated-imports.ts

# Ask for confirmation
read -p "Are you sure you want to remove the deprecated files? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # Run the removal script
  echo "Removing deprecated files..."
  npx ts-node scripts/remove-deprecated-files.ts
  
  echo "Migration complete!"
else
  echo "Migration cancelled."
fi
