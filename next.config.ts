import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./i18n/static-pages/**/*"],
  },
};

export default nextConfig;
