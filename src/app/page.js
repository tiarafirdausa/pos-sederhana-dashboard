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
    const fetchUserRole = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          credentials: "include", 
        });

        if (res.ok) {
          const data = await res.json();
          setUserRole(data.role); 
        } else {
          router.replace("/auth/login");
        }
      } catch (error) {
        console.error("Gagal mengambil user:", error);
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [router]);

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
