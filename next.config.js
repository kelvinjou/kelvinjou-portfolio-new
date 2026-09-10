/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => ({
  reactStrictMode: true,
  // Keep local-only editor API routes available in `next dev`. Production
  // remains a static export for GitHub Pages and other static hosts.
  ...(phase === PHASE_DEVELOPMENT_SERVER ? {} : { output: "export" }),
  images: {
    unoptimized: true,
  },
});
