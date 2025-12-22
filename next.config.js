/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable fast refresh for better development experience
  experimental: {
    // Fast refresh for components
    turbo: {
      rules: {
        '*.tsx': {
          loaders: ['@next/swc-loader'],
          as: '*.tsx',
        },
        '*.ts': {
          loaders: ['@next/swc-loader'],
          as: '*.ts',
        },
      },
    },
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Enable webpack configuration for better hot reload
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Enable fast refresh for all React components
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
      };

      // Configure webpack for better hot module replacement
      config.optimization = {
        ...config.optimization,
        providedExports: false,
        usedExports: false,
        sideEffects: false,
      };
    }

    return config;
  },

  // Configure compiler options for SWC
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization
  images: {
    domains: ['localhost'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
