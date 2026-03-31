"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/calendar", label: "Calendar" },
  { href: "/booking", label: "Booking" },
  { href: "/contact", label: "Contact" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function TopNav() {
  const pathname = usePathname() ?? "/";

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-white/10 dark:bg-black/40">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:py-4">
        <Link
          href="/"
          className="inline-flex items-baseline gap-2 font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          <span className="text-lg">Stottle</span>
          <span className="text-lg text-zinc-500 dark:text-zinc-400">
            Event Space
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-1">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  "sm:px-3 sm:py-2 px-2.5 py-2",
                  "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
                  "dark:text-zinc-200 dark:hover:bg-white/10 dark:hover:text-white",
                  active
                    ? "bg-zinc-100 text-zinc-900 dark:bg-white/10 dark:text-white"
                    : "",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

