"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AdminPanel } from "@/components/admin-panel";

export default function AdminPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAdmin = localStorage.getItem("isAdmin");
      if (isAdmin === "true") {
        setAllowed(true);
      } else {
        router.replace("/");
      }
    }
  }, [router]);

  if (!allowed) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <AdminPanel />
      </main>
      <Footer />
    </div>
  );
}
