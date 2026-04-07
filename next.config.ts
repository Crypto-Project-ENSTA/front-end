import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'www.images.pexels.com',
      },
      { 
        protocol: 'https',
        hostname: 'assets.aceternity.com' 
      }
    ],
  },
};

export default nextConfig;
