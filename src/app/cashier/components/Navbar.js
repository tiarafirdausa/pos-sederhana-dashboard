"use client";
import Image from "next/image";

export default function Navbar() {
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
          <p className="text-xs text-[var(--neutral-grey6)]">Admin</p>
        </div>
         <Image src="/assets/icons/logout.svg" alt="logout" width={20} height={20}  />  
      </div>
    </header>
  );
}
