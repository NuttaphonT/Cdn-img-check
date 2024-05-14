/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "apps.maxion.gg",
      "apps.maxion.tech",
      "rop2e-collection-cdn.s3-bkk.nipa.cloud",
      "rop2e-item-cdn.s3-bkk.nipa.cloud",
      "rop2e-monster-cdn.s3-bkk.nipa.cloud",
      "rop2e-map-cdn.s3-bkk.nipa.cloud",
      "file5s.ratemyserver.net",
      "render-player.landverse.maxion.gg",
      "cbt-render-player.maxion.gg",
      "news.landverse.maxion.gg",
      "cdn.maxion.gg",
    ],
  },
};

export default nextConfig;
