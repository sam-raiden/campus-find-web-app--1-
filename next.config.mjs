/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://lost-found-production-8253.up.railway.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
