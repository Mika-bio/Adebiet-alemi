"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Home,
  LogIn,
  LogOut,
  Menu,
  Music,
  PlayCircle,
  Users,
  X,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

const links = [
  { href: "/", label: "Басты бет", icon: Home },
  { href: "/kitaptar", label: "Кітаптар", icon: BookOpen },
  { href: "/videolar", label: "Видеолар", icon: PlayCircle },
  { href: "/tapsyrmalar", label: "Тапсырмалар", icon: GraduationCap },
  { href: "/muzyka", label: "Музыка", icon: Music },
  { href: "/aqyndar", label: "Ақындар", icon: Users },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);

  const roleLabel = user?.role === "teacher" ? "Мұғалім" : "Оқушы";

  return (
    <header className="sticky top-0 z-50 border-b border-burgundy/10 bg-cream-50/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy text-gold shadow-soft">
            <BookOpen className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="font-serif text-lg font-bold text-burgundy group-hover:text-burgundy-600">
              Әдебиет Әлемі
            </p>
            <p className="hidden text-xs text-burgundy/50 sm:block">
              Мектеп әдебиет платформасы
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-burgundy text-cream"
                    : "text-burgundy/70 hover:bg-burgundy/5 hover:text-burgundy"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {!loading && user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden items-center gap-2 rounded-lg border border-burgundy/15 bg-cream px-3 py-1.5 text-sm sm:flex"
              >
                <LayoutDashboard className="h-4 w-4 text-gold-dark" />
                <span className="font-medium text-burgundy">{user.name}</span>
                <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs text-gold-dark">
                  {roleLabel}
                </span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="btn-secondary !px-3 !py-2"
                title="Шығу"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Шығу</span>
              </button>
            </>
          ) : !loading ? (
            <Link href="/login" className="btn-primary !px-3 !py-2">
              <LogIn className="h-4 w-4" />
              <span>Кіру</span>
            </Link>
          ) : null}

          <button
            type="button"
            className="rounded-lg p-2 text-burgundy lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Меню"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-burgundy/10 bg-cream-50 px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map(({ href, label, icon: Icon }) => {
              const active =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    active
                      ? "bg-burgundy text-cream"
                      : "text-burgundy/80 hover:bg-burgundy/5"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
            {user && (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-burgundy/80 hover:bg-burgundy/5"
              >
                <LayoutDashboard className="h-4 w-4" />
                Жеке кабинет
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
