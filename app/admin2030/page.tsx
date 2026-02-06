"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Admin2030Page() {
  const router = useRouter();

  useEffect(() => {
    // guard: run ONLY in browser
    if (typeof window !== "undefined") {
      localStorage.setItem("isAdmin", "true");
      router.replace("/admin");
    }
  }, [router]);

  return null; // ⛔ render nothing
}
