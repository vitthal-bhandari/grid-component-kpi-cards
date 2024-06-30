import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KPI Cards",
  description: "A simple vercel app to display KPI cards in a fully responsive grid component ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-row justify-center items-center ${inter.className}`}>{children}</body>
    </html>
  );
}
