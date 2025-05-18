# Palm Tree Garage Door Repair

A high-performance, SEO-optimized website for a garage door repair business built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ⚡️ Lightning-fast performance with Next.js App Router
- 📱 Fully responsive design for all device sizes
- 🔍 SEO-optimized with structured data and metadata
- 🌐 Service area targeting with location-specific content
- 📊 Analytics integration with Google Tag Manager
- 📞 Call tracking with CallRail integration
- 🔒 Form validation and security measures
- 🖼️ Image optimization with Cloudinary
- ♿️ Accessibility compliant

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/palm-tree-garage-door.git
   cd palm-tree-garage-door
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Then edit `.env.local` with your actual values.

4. Run the development server:
   \`\`\`bash
   pnpm dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

The following environment variables are required:

- `GTM_ID`: Google Tag Manager ID
- `CALLRAIL_API_KEY`: CallRail API Key
- `CLOUDINARY_API_KEY`: Cloudinary API Key
- `CLOUDINARY_API_SECRET`: Cloudinary API Secret
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloudinary Cloud Name
- `RECAPTCHA_SECRET_KEY`: Google reCAPTCHA Secret Key (server-side only)
- `SITE_URL`: Your website URL
- `NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID`: CallRail Account ID
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`: Cloudinary Upload Preset

## Project Structure

\`\`\`
palm-tree-garage-door/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── (site)/           # Main site pages
│   └── admin/            # Admin dashboard
├── components/           # React components
│   ├── forms/            # Form components
│   ├── schema/           # JSON-LD schema components
│   └── tracking/         # Analytics components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── analytics/        # Analytics utilities
│   └── callrail/         # CallRail integration
├── public/               # Static assets
│   └── images/           # Image assets
└── scripts/              # Build and utility scripts
\`\`\`

## Testing

Run tests with:

\`\`\`bash
pnpm test
\`\`\`

## Deployment

The site is configured for deployment on Vercel:

\`\`\`bash
pnpm build
\`\`\`

## SEO Optimization

Run the SEO audit script to check for common issues:

\`\`\`bash
pnpm run seo-audit
\`\`\`

## Performance Optimization

The site uses several performance optimization techniques:

- Image optimization with next/image and Cloudinary
- Component code splitting
- Server-side rendering where appropriate
- Client-side caching strategies
- Lazy loading of below-the-fold content

## Accessibility

The site is built with accessibility in mind:

- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Color contrast compliance

## License

This project is proprietary and confidential.

## Support

For support, please contact [support@palmtreegaragedoor.com](mailto:support@palmtreegaragedoor.com).
