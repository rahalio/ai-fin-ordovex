const TOKEN_KEY = 'ordovex.accessToken';
const ROLE_KEY = 'ordovex.role';
const NAME_KEY = 'ordovex.name';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function getRole() {
  return localStorage.getItem(ROLE_KEY) ?? 'desk_head';
}
export function getDisplayName() {
  return localStorage.getItem(NAME_KEY) ?? '';
}

export function setSession(token: string, role: string, name: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
  localStorage.setItem(NAME_KEY, name);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(NAME_KEY);
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (init.method && init.method !== 'GET') {
    headers.set('Idempotency-Key', crypto.randomUUID());
  }
  const res = await fetch(path, { ...init, headers });
  if (res.status === 204) return undefined as T;
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.detail || json.message || json.title || res.statusText);
  }
  return json as T;
}

export type Envelope<T> = { data: T; meta?: unknown };
export type ListEnvelope<T> = { data: { items: T[] }; meta?: unknown };
