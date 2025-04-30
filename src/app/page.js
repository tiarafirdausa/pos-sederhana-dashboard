"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Import komponen dashboard untuk masing-masing role
import AdminDashboard from "./admin/dashboard/page";
import CashierDashboard from "./cashier/dashboard/page";

export default function Page() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setUserRole(storedRole);
    setLoading(false);

    // Hanya redirect jika userRole null DAN loading sudah selesai
    if (!storedRole && !loading) {
      router.push("/auth/login");
    }
  }, [router, loading]); // Tambahkan router dan loading sebagai dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userRole) {
    // Kita tidak perlu redirect di sini lagi karena sudah ditangani di useEffect
    return null;
  }

  if (userRole === "admin") {
    return <AdminDashboard />;
  }

  if (userRole === "cashier") {
    return <CashierDashboard />;
  }

  return <div>Error: Role pengguna tidak dikenali.</div>;
}