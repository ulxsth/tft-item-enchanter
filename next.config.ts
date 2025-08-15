import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_ACTIONS || process.env.DEPLOY_ENV === 'gh-pages';

const nextConfig: NextConfig = {
  output: isProd ? 'export' : undefined,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: isProd ? 'docs' : '.next',
  
  // GitHub Pages用の設定
  basePath: isProd && isGitHubPages ? '/tft-item-enchanter' : '',
  assetPrefix: isProd && isGitHubPages ? '/tft-item-enchanter/' : '',
  
  images: {
    unoptimized: true,
  },
  
  // 静的ファイルの最適化
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
