"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");

    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");

    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      router.push("/auth/login");
    } catch (error) {
      console.error("Error logout:", error);
      router.push("/auth/login");
    }
  };

  const getDisplayName = () => {
    switch (userRole) {
      case "admin":
        return "Admin";
      case "cashier":
        return "Cashier";
      default:
        return "-";
    }
  };

  return (
    <header className="w-full h-20 bg-white flex items-center justify-between px-6">
      {/* Search bar */}
      <div className="relative w-1/2">
        <Image
          src="/assets/icons/search-normal.svg"
          alt="Search Icon"
          width={16}
          height={16}
          className="absolute left-3 top-1/2 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Enter the keyword here..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--neutral-grey2)] focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm font-light text-[var(--neutral-grey3)]"
        />
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <Image
          src="/assets/img/user.png"
          alt="User Avatar"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
        <div className="text-left">
          <p className="text-sm font-medium text-black">John Doe</p>
          <p className="text-xs text-[var(--neutral-grey6)]">{getDisplayName()}</p>
        </div>
        <button
          onClick={handleLogout}
          className="cursor-pointer p-0 border-none bg-transparent"
        >
          <Image
            src="/assets/icons/logout.svg"
            alt="logout"
            width={20}
            height={20}
          />
        </button>
      </div>
    </header>
  );
}
