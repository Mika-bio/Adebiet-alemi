/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "archive.org",
      },
      {
        protocol: "https",
        hostname: "ia800*.us.archive.org",
      },
    ],
  },
};

export default nextConfig;
