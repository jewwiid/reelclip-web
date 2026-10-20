import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./i18n/static-pages/**/*", "./i18n/guides/**/*"],
  },
};

export default nextConfig;
