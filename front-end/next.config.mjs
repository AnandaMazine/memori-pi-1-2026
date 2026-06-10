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
  },
};

export default nextConfig;

