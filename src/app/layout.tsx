// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "US Business Directory",
  description: "Private, fast directory for acquisition sourcing.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Gray site background only. */}
      <body className="bg-gray-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
