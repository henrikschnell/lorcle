import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

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

export default withNextIntl(nextConfig);
