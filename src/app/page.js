"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "./admin/page";
import CashierDashboard from "./cashier/page";

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
      router.replace("/auth/login");
    }
  }, [router, loading]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userRole === "admin") {
    return <AdminDashboard />;
  }

  if (userRole === "cashier") {
    return <CashierDashboard />;
  }

  return <div>Error: Role pengguna tidak dikenali.</div>;
}