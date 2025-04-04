/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg)$/i,
      type: 'asset/resource',
    });
    return config;
  },
  images: {
    domains: ['unpkg.com'],
  },
}

module.exports = nextConfig 