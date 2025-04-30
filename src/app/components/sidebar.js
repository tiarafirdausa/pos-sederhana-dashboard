"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setUserRole(storedRole);
  }, []);

  if (!userRole) return null; // Jangan render sidebar kalau belum tau role

  const menus = {
    admin: [
      { name: "Dashboard", path: "/admin/dashboard", icon: "/assets/icons/element-3.svg" },
      { name: "Catalog", path: "/admin/catalog", icon: "/assets/icons/menu-board.svg" },
      { name: "Sales Report", path: "/admin/sales-report", icon: "/assets/icons/clipboard-text.svg" },
      { name: "Settings", path: "/admin/settings", icon: "/assets/icons/setting-2.svg" },
    ],
    cashier: [
      { name: "Cashier", path: "/cashier/dashboard", icon: "/assets/icons/shop.svg" },
      { name: "Sales Report", path: "/cashier/sales-report", icon: "/assets/icons/clipboard-text.svg" },
      { name: "Settings", path: "/cashier/settings", icon: "/assets/icons/setting-2.svg" },
    ],
  };

  const menu = menus[userRole];

  return (
    <aside className="w-52 h-screen bg-white p-4 space-y-6 fixed">
      {/* logo padipos */}
      <div className="text-2xl font-bold text-center">
        <Image src="/assets/icons/Logo.svg" alt="padipos" width={130} height={50} />
      </div>

      {/* menu */}
      <nav className="space-y-2">
        {menu.map((item) => (
          <Link key={item.path} href={item.path}>
            <div className="flex items-center gap-4 p-2 mt-2 rounded cursor-pointer">
              <Image src={item.icon} alt={item.name} width={26} height={26} />
              <span className={`text-sm ${pathname === item.path ? "text-[var(--blue1-main)]" : "text-[var(--neutral-grey3)]"}`}>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
