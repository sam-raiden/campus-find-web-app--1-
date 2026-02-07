const API_BASE = "";

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
    description: data.description?.trim() || "",
    location: data.location.trim(),
    contact: data.contact.trim(),
    date: new Date(data.date).toISOString(),
  };

  // DEBUG: Log what we're actually sending
  console.log("🚀 PAYLOAD BEING SENT:", JSON.stringify(payload, null, 2));

  const res = await fetch("/api/lost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ API ERROR RESPONSE:", errorText);
    console.error("❌ STATUS CODE:", res.status);
    throw new Error(`Failed to create lost item: ${res.status}`);
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
  };

  console.log("🚀 PAYLOAD BEING SENT:", JSON.stringify(payload, null, 2));

  const res = await fetch("/api/found", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ API ERROR RESPONSE:", errorText);
    console.error("❌ STATUS CODE:", res.status);
    throw new Error(`Failed to create found item: ${res.status}`);
  }

  return res.json();
}

export async function getLostItems() {
  const res = await fetch("/api/lost");
  if (!res.ok) throw new Error("Failed to fetch lost items");
  return res.json();
}

export async function getFoundItems() {
  const res = await fetch("/api/found");
  if (!res.ok) throw new Error("Failed to fetch found items");
  return res.json();
}

export async function resolveLostItem(id: number) {
  const res = await fetch(`/api/lost/${id}/resolve`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Failed to resolve lost item");
}

export async function resolveFoundItem(id: number) {
  const res = await fetch(`/api/found/${id}/resolve`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Failed to resolve found item");
}