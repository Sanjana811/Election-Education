import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "India Elections Education Assistant",
  description: "Learn about India's democratic process, elections, voting mechanisms, and eligibility criteria with our interactive educational assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
