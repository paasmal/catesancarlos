import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1.119:3000', '192.168.1.119', '192.168.0.32', '192.168.0.32:3000']
};

export default nextConfig;
