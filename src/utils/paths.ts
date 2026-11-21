export const getAssetPath = (path: string): string => {
  if (!path) return '';
  // 1. Preserve Base64 data URLs as-is
  if (path.startsWith('data:')) return path;
  // 2. Preserve absolute HTTP / HTTPS URLs as-is
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  // 3. Resolve relative asset paths under the current Vite base URL (e.g. /sssa-website/)
  const base = import.meta.env.BASE_URL || '/';
  // Avoid double prefixing if path already starts with base
  if (base !== '/' && path.startsWith(base)) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};
