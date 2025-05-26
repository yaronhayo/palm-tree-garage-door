# Palm Tree Garage Door

A lightning-fast, SEO-ready landing page for Palm Tree Garage Door service.

## Tech Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS, shadcn/ui, lucide-react icons
- Vercel/Netlify hosting
- Resend for transactional email
- Google Tag Manager for analytics
- CallRail for call tracking
- next-sitemap & next-seo for SEO optimization

## Getting Started

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a `.env` file based on `.env.example`
4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Building for Production

\`\`\`bash
npm run build
\`\`\`

This will generate a static export in the `out` directory, ready for deployment to Netlify or any static hosting service.

## Deployment

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
4. Set up your environment variables in Netlify's dashboard

## Features

- Responsive design optimized for all devices
- SEO-optimized with structured data
- Performance-optimized with Core Web Vitals in mind
- Form handling with validation and reCAPTCHA
- Email notifications for new leads
- Call tracking with CallRail
- Analytics with Google Tag Manager
- Testimonials and service showcase
- Service area targeting

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - React components
- `lib/` - Utility functions and helpers
- `public/` - Static assets
- `scripts/` - Build and utility scripts
- `types/` - TypeScript type definitions

## Environment Variables

See `.env.example` for required environment variables.

## License

This project is proprietary and confidential. Unauthorized copying, transfer, or reproduction of the contents is strictly prohibited.
