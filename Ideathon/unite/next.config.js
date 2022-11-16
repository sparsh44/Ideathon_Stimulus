/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["links.papareact.com", "cdn-icons-png.flaticon.com", "media.istockphoto.com", "images.unsplash.com", "hawkhcsdahiaxlsytwfd.supabase.co"],
  },
}

module.exports = nextConfig
