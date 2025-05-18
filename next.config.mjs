import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js';

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
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? 
        `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}.cloudinary.com` : 
        'res.cloudinary.com',
      'via.placeholder.com',
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    loader: 'default',
    path: '/_next/image',
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Add trailing slashes for cleaner URLs
  experimental: {
    // Disable CSS optimization completely
    optimizeCss: false,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    serverActions: true,
  },
};

const pwaConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching,
};

export default withPWA(pwaConfig)(nextConfig);
