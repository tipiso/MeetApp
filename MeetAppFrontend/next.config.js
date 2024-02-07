/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me', 'res.cloudinary.com', 'images.pexels.com'],
  },
};

module.exports = nextConfig;
