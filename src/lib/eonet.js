const BASE = 'https://eonet.gsfc.nasa.gov/api/v3';

export async function fetchEvents({ category = '', status = 'open', days = 30, limit = 300 } = {}) {
  const params = new URLSearchParams({ status, limit: String(limit), days: String(days) });
  if (category) params.set('category', category);
  const res = await fetch(`${BASE}/events/geojson?${params}`);
  if (!res.ok) throw new Error(`EONET error: ${res.status}`);
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${BASE}/categories`);
  if (!res.ok) throw new Error(`EONET error: ${res.status}`);
  return res.json();
}

export async function fetchEventDetail(id) {
  const res = await fetch(`${BASE}/events/${id}`);
  if (!res.ok) throw new Error(`EONET error: ${res.status}`);
  return res.json();
}
