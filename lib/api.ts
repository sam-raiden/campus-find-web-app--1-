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

  const res = await fetch("/api/lost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), // 🔥 NO wrapper, NO status
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("API ERROR:", err);
    throw new Error("Failed to create lost item");
  }

  return res.json();
}
