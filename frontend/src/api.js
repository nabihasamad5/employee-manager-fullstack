// Backend URL comes from .env (VITE_API_URL)
const BASE = 'https://employee-manager-fullstack.vercel.app';
//import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function api(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}
