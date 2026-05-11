const rawApiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

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