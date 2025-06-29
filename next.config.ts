import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* other next.js config options here */

    // The 'webpack' function is the correct place for this configuration
    webpack: (config, { isServer, dev }) => {
        // We only want to modify watchOptions in development mode
        // and not for the server-side compilation
        if (dev && !isServer) {
            // Provide only string globs, per webpack 5 schema
            const ignoreGlobs: string[] = [
                '**/node_modules/**',    // webpack default (as a glob)
                '**/*.db',
                '**/.db',
                '**/prisma/dev.db',
            ];

            config.watchOptions = {
                ...config.watchOptions,
                ignored: ignoreGlobs,
            };
        }

        // Important: return the modified config
        return config;
    },
};

export default nextConfig;