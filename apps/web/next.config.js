/** @type {import('next').NextConfig} */
const NextConfig = {
  experimental: {
    largePageDataBytes: 1 * 1024 * 1024, // 1mb
    instrumentationHook: false,
  },
  // Disable webpack cache to avoid permission issues
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

module.exports = NextConfig;
