"use client";

import "./globals.css";
import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({ children }) {
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
  const storedRole = localStorage.getItem("userRole");
  const isAuthPage = pathname.startsWith("/auth");

  if (!storedRole && !isAuthPage) {
    router.push("/auth/login");
  } else {
    setUserRole(storedRole);
  }
}, [pathname, router]);


  const isLoginPage = pathname === "/auth/login";
  const isRegisterPage = pathname === "/auth/register";

  if (isLoginPage || isRegisterPage) { 
    return (
      <html lang="en" className={roboto.variable}>
        <body className="bg-[var(--neutral-grey1)] font-sans">
          <main>{children}</main>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={roboto.variable}>
      <body className="bg-[var(--neutral-grey1)] font-sans">
        {userRole === "admin"  ||  userRole === "cashier" &&  (
          <>
            <Sidebar />
            <div className="ml-52 flex-1 flex flex-col min-h-screen bg-[var(--neutral-grey1)]">
              <Navbar />
              <main className="p-6">{children}</main>
            </div>
          </>
        )}
      </body>
    </html>
  );
}