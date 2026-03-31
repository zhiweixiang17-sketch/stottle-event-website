import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopNav } from "./components/TopNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Stottle Event Space",
    template: "%s · Stottle Event Space",
  },
  description:
    "A clean, flexible event space for celebrations, meetings, and gatherings. View the gallery, request availability, and get in touch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-white text-zinc-900`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <TopNav />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-zinc-200/70 bg-white/80 py-10 backdrop-blur dark:border-white/10 dark:bg-black/40">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between dark:text-zinc-300">
            <p>
              © {new Date().getFullYear()} Stottle Event Space. All rights
              reserved.
            </p>
            <p className="text-zinc-500 dark:text-zinc-400">
              Rentals by appointment · Flexible packages · Easy booking
              requests
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
