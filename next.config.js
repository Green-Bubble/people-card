/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Modify the entry file for the client-side application
    if (!isServer) {
      config.entry.main = './app/pages/home/index.tsx'; // Replace with the path to your custom entry file
    }

    return config;
  },
  images: {
    domains: ['robohash.org'],
  },
  pageExtensions: ['ts', 'tsx'],
  swcMinify: false,
  experimental: {
    swcTraceProfiling: true,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
