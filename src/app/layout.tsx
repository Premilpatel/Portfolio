import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premil Patel's Screen",
  description: "Premil Patel's Desktop Screen",
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
