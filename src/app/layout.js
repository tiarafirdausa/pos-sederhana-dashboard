import "./globals.css";
import { Roboto } from "next/font/google";
import ClientLayout from "./clientLayout";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="bg-[var(--neutral-grey1)] font-sans">
        <ClientLayout>{children}</ClientLayout> 
      </body>
    </html>
  );
}
