import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: process.env.NODE_ENV === 'production' ? 'docs' : '.next',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
