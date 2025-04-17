import "./globals.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Dashboard",
  description: "Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans">
        <Sidebar />
        <div className="ml-52 flex-1 flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
      </body>
    </html>
  );
}