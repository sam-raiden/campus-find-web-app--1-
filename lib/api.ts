const API_BASE = ""; // MUST stay empty (Vercel proxy)

// ---------- TYPES (OPTIONAL BUT SAFE) ----------
type LostPayload = {
  itemName: string;
  category: string;
  description: string;
  location: string;
  contact: string;
  date: string;
};

type FoundPayload = {
  itemName: string;
  category: string;
  location: string;
  contact: string;
  date: string;
};

// ---------- LOST ----------
export async function createLostItem(data: {
  itemName: string;
  category: string;
  description?: string;
  location: string;
  contact: string;
  date: string;
}) {
  const payload: LostPayload = {
    itemName: data.itemName.trim(),
    category: data.category.trim(),
    description: data.description?.trim() ?? "",
    location: data.location.trim(),
    contact: data.contact.trim(),
    date: new Date(data.date).toISOString(),
  };

  // 🔥 DEBUG – KEEP THIS UNTIL DEMO WORKS
  console.log("🚀 LOST PAYLOAD:", payload);

  const res = await fetch(`${API_BASE}/api/lost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ LOST API ERROR:", text);
    throw new Error(`Create lost failed: ${res.status}`);
  }

  return res.json();
}

// ---------- FOUND ----------
export async function createFoundItem(data: {
  itemName: string;
  category: string;
  location: string;
  contact: string;
  date: string;
}) {
  const payload: FoundPayload = {
    itemName: data.itemName.trim(),
    category: data.category.trim(),
    location: data.location.trim(),
    contact: data.contact.trim(),
    date: new Date(data.date).toISOString(),
  };

  console.log("🚀 FOUND PAYLOAD:", payload);

  const res = await fetch(`${API_BASE}/api/found`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ FOUND API ERROR:", text);
    throw new Error(`Create found failed: ${res.status}`);
  }

  return res.json();
}

// ---------- GET ----------
export async function getLostItems() {
  const res = await fetch(`${API_BASE}/api/lost`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch lost items");
  return res.json();
}

export async function getFoundItems() {
  const res = await fetch(`${API_BASE}/api/found`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch found items");
  return res.json();
}

// ---------- RESOLVE ----------
export async function resolveLost(id: number) {
  const res = await fetch(`${API_BASE}/api/lost/${id}/resolve`, {
    method: "PUT",
  });

  if (!res.ok) throw new Error("Failed to resolve lost item");
}

export async function resolveFound(id: number) {
  const res = await fetch(`${API_BASE}/api/found/${id}/resolve`, {
    method: "PUT",
  });

  if (!res.ok) throw new Error("Failed to resolve found item");
}
