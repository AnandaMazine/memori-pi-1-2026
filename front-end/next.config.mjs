/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  
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

