/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",

  // Enable experimental features
  experimental: {
    optimizeCss: false,
    scrollRestoration: true,
  },

  // Configure compiler options for SWC
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Image optimization - updated to use remotePatterns instead of deprecated domains
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
