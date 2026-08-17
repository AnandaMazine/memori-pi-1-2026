const rawApiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://memori-crm.onrender.com/api";

export const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, "");
export const API_ORIGIN = API_BASE_URL.replace(/\/api$/, "");

export function buildApiUrl(path) {
  const normalizedPath = path.replace(/^\//, "");
  return `${API_BASE_URL}/${normalizedPath}`;
}

export function buildAssetUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_ORIGIN}${normalizedPath}`;
}

// Converter URLs de modelos 3D para usar a rota correta
export function buildModel3DUrl(modelUrl) {
  if (!modelUrl) return modelUrl;

  // Se já está usando a rota de API mockada, retorna como está
  if (modelUrl.includes('/api/model3d')) {
    return modelUrl;
  }

  // Para URLs relativas (ex: /uploads/modelagens/models_3d/...), retorna como está
  // O Next.js rewrite vai redirecionar para o backend
  return modelUrl;
}