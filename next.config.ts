import type { NextConfig } from "next";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost'], // Add localhost to the domains array
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    // Add the MiniCssExtractPlugin to the plugins array
    config.plugins.push(new MiniCssExtractPlugin());

    // Important: return the modified config
    return config;
  },
};

export default nextConfig;
