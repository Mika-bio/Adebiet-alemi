"use client";

import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { LogIn, Loader2 } from "lucide-react";
import type { ReactNode } from "react";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-burgundy" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <div className="card">
          <LogIn className="mx-auto mb-4 h-12 w-12 text-gold" />
          <h2 className="font-serif text-2xl font-bold text-burgundy">
            Кіру қажет
          </h2>
          <p className="mt-2 text-burgundy/70">
            Бұл бетті көру үшін жүйеге кіріңіз.
          </p>
          <Link href="/login" className="btn-primary mt-6">
            Кіру бетіне өту
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
