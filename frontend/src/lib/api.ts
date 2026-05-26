const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  // In a real multi-tenant app, the tenantId would be determined by the domain or a slug in the URL.
  // For the MVP, we'll use a hardcoded one or let the user pass it.
  const tenantId = 'tenant-1'; 

  const headers = {
    'Content-Type': 'application/json',
    'x-tenant-id': tenantId,
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Something went wrong');
  }

  return response.json();
}
