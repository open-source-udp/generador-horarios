/** @type {import('next').NextConfig} */
const NextConfig = {
  experimental: {
    largePageDataBytes: 1 * 1024 * 1024, // 1mb
  },
};

module.exports = NextConfig;
