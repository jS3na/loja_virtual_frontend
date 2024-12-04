import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Painel do Admin",
  description: "Painel do Admin de uma Loja Virtual",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-grow p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
