import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.lorcana.ravensburger.com", // Allow images from all domains
            },
        ],
    },
};

export default nextConfig;
