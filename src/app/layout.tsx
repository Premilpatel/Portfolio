import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premil Patel — macOS Portfolio",
  description: "Interactive macOS Yosemite portfolio experience by Premil Patel featuring an authentic dock, finder file browser, gallery, terminal, and projects showcase.",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full w-full overflow-hidden m-0 p-0 font-sans">{children}</body>
    </html>
  );
}
