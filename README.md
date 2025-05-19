# Palm Tree Garage Door

Professional garage door repair and installation services in South Florida.

## Deployment Instructions

### GitHub Setup

1. Create a new repository on GitHub
2. Initialize the local repository and push to GitHub:

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/palm-tree-garage-door.git
git push -u origin main
\`\`\`

### Netlify Deployment

1. Log in to Netlify (https://app.netlify.com/)
2. Click "New site from Git"
3. Select GitHub and authorize Netlify
4. Select the repository you just created
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
6. Click "Deploy site"

### Environment Variables

Add the following environment variables in Netlify's site settings (refer to your .env.local file for values):

- NEXT_PUBLIC_GTM_ID
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID
- NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- BUSINESS_EMAIL
- SITE_URL

**Note:** For security reasons, never commit actual environment variable values to your repository. Use a private .env.local file locally and set the values directly in Netlify's dashboard.

## Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## Security Notes

- ReCAPTCHA keys should be set in Netlify's environment variables and not committed to the repository
- All API keys should be kept private and only added through Netlify's environment variables interface
- For local development, use a .env.local file (which is git-ignored)
