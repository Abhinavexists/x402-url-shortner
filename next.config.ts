import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-ignore
    nodeMiddleware: true,
  },
};
export default nextConfig;
