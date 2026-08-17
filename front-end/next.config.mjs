import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ["192.168.1.66"],

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://localhost:4000/uploads/:path*",
      },
      {
        source: "/uploads/modelagens/:path*",
        destination: "http://localhost:3002/uploads/modelagens/:path*",
      },
      {
        source: "/uploads/midias/:path*",
        destination: "http://localhost:3002/uploads/midias/:path*",
      },
    ];
  },
};

export default nextConfig;

