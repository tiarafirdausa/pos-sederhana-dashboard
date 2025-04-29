import "./globals.css";
import Sidebar from "./admin/components/Sidebar";
import Navbar from "./admin/components/Navbar";
// import Sidebar from "./cashier/components/Sidebar";
// import Navbar from "./cashier/components/Navbar";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Dashboard",
  description: "Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="bg-[var(--neutral-grey1)] font-sans">
        <Sidebar />
        <div className="ml-52 flex-1 flex flex-col min-h-screen bg-[var(--neutral-grey1)]">
          <Navbar />
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
