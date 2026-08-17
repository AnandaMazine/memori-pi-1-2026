<<<<<<< HEAD
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/api/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:4000/uploads/:path*',
      },
    ];
=======
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ['192.168.1.66'],

  // Redirecionar requests para arquivos estáticos do backend
  async rewrites() {
    return {
      fallback: [
        {
          source: '/uploads/modelagens/:path*',
          destination: 'http://localhost:3002/uploads/modelagens/:path*',
        },
        {
          source: '/uploads/midias/:path*',
          destination: 'http://localhost:3002/uploads/midias/:path*',
        },
      ],
    };
>>>>>>> 8f09dddf1cd08ecfd8d7c1cc5ee3c7b1a3921dce
  },
};

export default nextConfig;

