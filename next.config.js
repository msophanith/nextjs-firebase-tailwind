/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable experimental features
  experimental: {
    optimizeCss: false,
    scrollRestoration: true,
  },

  // Configure compiler options for SWC
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Webpack configuration to prevent 431 errors
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Use faster, smaller source maps in development
      config.devtool = "eval-cheap-module-source-map";
    }
    return config;
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
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
