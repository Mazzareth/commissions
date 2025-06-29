import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpackDevMiddleware: (config) => {
    // Preserve any existing ignored patterns and add .db files
    const prevIgnored = config.watchOptions?.ignored;
    const dbPatterns = ["**/*.db", "**/prisma/dev.db"];
    if (Array.isArray(prevIgnored)) {
      config.watchOptions.ignored = [...prevIgnored, ...dbPatterns];
    } else if (typeof prevIgnored === "string") {
      config.watchOptions.ignored = [prevIgnored, ...dbPatterns];
    } else if (prevIgnored instanceof RegExp) {
      // Not likely in Next.js defaults, but support it
      config.watchOptions.ignored = [prevIgnored, ...dbPatterns];
    } else {
      config.watchOptions.ignored = dbPatterns;
    }
    return config;
  },
};

export default nextConfig;
