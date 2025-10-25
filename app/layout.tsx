import type { Metadata } from "next";
import { ContextProvider } from "@/lib/context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Based Guestbook",
  description: "Leave your message on-chain",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
