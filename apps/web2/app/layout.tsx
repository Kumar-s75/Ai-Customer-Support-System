import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Support System",
  description: "Multi-agent AI customer support system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
