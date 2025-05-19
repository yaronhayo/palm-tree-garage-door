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
  },
  trailingSlash: true, // Add trailing slashes for cleaner URLs
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
