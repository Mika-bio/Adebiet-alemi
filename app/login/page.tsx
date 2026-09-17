"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, KeyRound, User, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const result = login(username, password);
    if (result.ok) {
      router.push("/dashboard");
    } else {
      setError(result.error || "Қате");
    }
  };

  const fillDemo = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setError("");
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-12">
      <div className="card !p-8 shadow-book">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-burgundy text-gold">
            <BookOpen className="h-7 w-7" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-burgundy">
            Жүйеге кіру
          </h1>
          <p className="mt-1 text-sm text-burgundy/60">
            Әдебиет Әлемі — демо авторизация
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-burgundy">
              <User className="h-4 w-4" />
              Пайдаланушы аты
            </label>
            <input
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="оқушы немесе мұғалім (student / teacher)"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-burgundy">
              <KeyRound className="h-4 w-4" />
              Құпия сөз
            </label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary w-full">
            Кіру
          </button>
        </form>

        <div className="mt-6 rounded-xl border border-gold/30 bg-gold/10 p-4">
          <p className="mb-3 text-sm font-semibold text-burgundy">
            Демо аккаунттар:
          </p>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => fillDemo("student", "student123")}
              className="flex w-full items-center justify-between rounded-lg bg-cream px-3 py-2 text-left text-sm transition hover:bg-cream-200"
            >
              <span>
                <span className="font-medium text-burgundy">Оқушы:</span>{" "}
                <code className="text-burgundy/80">student / student123</code>
              </span>
              <span className="text-xs text-gold-dark">толтыру</span>
            </button>
            <button
              type="button"
              onClick={() => fillDemo("teacher", "teacher123")}
              className="flex w-full items-center justify-between rounded-lg bg-cream px-3 py-2 text-left text-sm transition hover:bg-cream-200"
            >
              <span>
                <span className="font-medium text-burgundy">Мұғалім:</span>{" "}
                <code className="text-burgundy/80">teacher / teacher123</code>
              </span>
              <span className="text-xs text-gold-dark">толтыру</span>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-burgundy/50">
          <Link href="/" className="hover:text-burgundy">
            ← Басты бетке оралу
          </Link>
        </p>
      </div>
    </div>
  );
}
