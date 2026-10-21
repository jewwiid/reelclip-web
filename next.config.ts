import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: "/app-reference/equal-clips.md",
      headers: [
        { key: "Content-Type", value: "text/plain; charset=utf-8" },
        { key: "Content-Disposition", value: "inline" },
      ],
    }];
  },
  outputFileTracingIncludes: {
    "/*": ["./i18n/static-pages/**/*", "./i18n/guides/**/*"],
  },
};

export default nextConfig;
