const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://lost-found-production-8253.up.railway.app";

// ---------- LOST ITEMS ----------

export async function getLostItems() {
  const res = await fetch(`${API_BASE}/api/lost`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch lost items");
  }

  return res.json();
}

export async function createLostItem(data: {
  itemName: string;
  category: string;
  description?: string;
  location: string;
  contact: string;
  date: string;
}) {
  const payload = {
    itemName: data.itemName.trim(),
    category: data.category.trim(),
    description: data.description ?? "",
    location: data.location.trim(),
    contact: data.contact.trim(),
    date: new Date(data.date).toISOString(),
    status: 0, // ✅ enum Pending
  };

  const res = await fetch(`${API_BASE}/api/lost`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(err);
    throw new Error("Failed to create lost item");
  }

  return res.json();
}




// ---------- FOUND ITEMS ----------

export async function getFoundItems() {
  const res = await fetch(`${API_BASE}/api/found`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch found items");
  }

  return res.json();
}

export async function createFoundItem(data: {
  itemName: string;
  category: string;
  location: string;
  contact: string;
  date: string;
}) {
  const payload = {
    itemName: data.itemName.trim(),
    category: data.category.trim(),
    location: data.location.trim(),
    contact: data.contact.trim(),
    date: new Date(data.date).toISOString(),
    status: 0, // ✅ enum Pending
  };
  

  const res = await fetch(`${API_BASE}/api/found`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(err);
    throw new Error("Failed to create found item");
  }

  return res.json();
}




// ---------- RESOLVE (🔥 FIXED) ----------

export async function resolveLost(id: number) {
  const res = await fetch(`${API_BASE}/api/lost/${id}/resolve`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to resolve lost item");
  }

  // some controllers return nothing, some return json
  try {
    return await res.json();
  } catch {
    return;
  }
}

export async function resolveFound(id: number) {
  const res = await fetch(`${API_BASE}/api/found/${id}/resolve`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to resolve found item");
  }

  try {
    return await res.json();
  } catch {
    return;
  }
}

// ---------- DASHBOARD ----------

export async function getDashboard() {
  const res = await fetch(`${API_BASE}/api/dashboard`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return res.json();
}
