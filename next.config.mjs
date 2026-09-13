/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // No remote image hosts yet; local /public only.
    remotePatterns: [],
  },
};

export default nextConfig;