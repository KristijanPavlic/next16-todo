import type { NextConfig } from "next";

// Next.js 16: Enhanced configuration with TypeScript support
const nextConfig: NextConfig = {
  // Next.js 16: Static export mode for SPA deployment
  // Generates static files that can be served from any static hosting
  output: 'export'
};

export default nextConfig;
