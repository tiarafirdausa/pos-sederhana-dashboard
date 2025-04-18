"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: "/assets/icons/element-3.svg" },
  { name: "Catalog", path: "/catalog", icon: "/assets/icons/menu-board.svg" },
  { name: "Sales Report", path: "/sales-report", icon: "/assets/icons/clipboard-text.svg" },
  { name: "Settings", path: "/settings", icon: "/assets/icons/setting-2.svg" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-52 h-screen bg-white p-4 space-y-6 fixed">
      
      {/* logo padipos */}
      <div className="text-2xl font-bold text-center">
        <Image src="/assets/icons/Logo.svg" alt="padipos" width={130} height={50}/>
      </div>

      {/* menu */}
      <nav className="space-y-2">
        {menu.map((item) => (
          <Link key={item.path} href={item.path}>
            <div className={`flex items-center gap-4 p-2 mt-2 rounded cursor-pointer ${
              pathname === item.path ? "bg-blue-100" : "hover:bg-gray-100"
            }`}>
              <Image src={item.icon} alt={item.name} width={26} height={26}  />
              <span className={`text-sm ${pathname === item.path ? "text-blue-700" : "text-gray-300"}`}>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>

    </aside>
  );
}
