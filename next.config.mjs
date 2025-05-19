/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Keep static export
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'blob.v0.dev',
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'vercel-storage.com',
      'public.blob.vercel-storage.com'
    ],
    unoptimized: true, // Required for static export
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
  },
  trailingSlash: true, // Add trailing slashes for cleaner URLs
  experimental: {
    optimizePackageImports: ['lucide-react'],
    optimizeCss: true,
    legacyBrowsers: false,
    browsersListForSwc: true,
    optimizeFonts: true,
    optimizeServerReact: true,
    scrollRestoration: true,
  },
  compress: true,
  poweredByHeader: false,
  webpack: (config, { dev, isServer }) => {
    // Optimize only in production
    if (!dev && !isServer) {
      // Add optimizations here
    }
    return config;
  },
};

export default nextConfig;
