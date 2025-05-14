#!/bin/bash

# Run the SEO check script
node scripts/check-seo.js

# Exit with the same status code as the Node script
exit $?
