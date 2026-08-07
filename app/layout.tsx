import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gas Monitoring Dashboard",
  description: "Dashboard monitoring gas consumption and leak metrics"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
