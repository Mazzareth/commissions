import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* other next.js config options here */

    // The 'webpack' function is the correct place for this configuration
    webpack: (config, { isServer, dev }) => {
        // We only want to modify watchOptions in development mode
        // and not for the server-side compilation
        if (dev && !isServer) {
            // Original ignored patterns
            const prevIgnored = config.watchOptions.ignored;

            // Your new patterns
            const dbPatterns = ["**/*.db", "**/.db", "**/prisma/dev.db"];

            let newIgnored: (string | RegExp)[] = [];

            // Combine existing ignored patterns with your new ones
            if (Array.isArray(prevIgnored)) {
                newIgnored = [...prevIgnored, ...dbPatterns];
            } else if (typeof prevIgnored === "string" || prevIgnored instanceof RegExp) {
                newIgnored = [prevIgnored, ...dbPatterns];
            } else {
                newIgnored = dbPatterns;
            }

            // Create a new 'watchOptions' object instead of mutating the existing one
            config.watchOptions = {
                ...config.watchOptions,
                ignored: newIgnored,
            };
        }

        // Important: return the modified config
        return config;
    },
};

export default nextConfig;