"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, KeyRound, User, AlertCircle, UserPlus } from "lucide-react";
import { useAuth } from "@/lib/auth";
import type { Role } from "@/lib/data";

type Mode = "login" | "register";

export default function LoginPage() {
  const { login, register, user, loading } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const result = login(username, password);
    if (result.ok) {
      router.push("/dashboard");
    } else {
      setError(result.error || "Қате");
    }
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const result = register({
      firstName,
      lastName,
      username,
      password,
      role,
    });
    if (result.ok) {
      router.push("/dashboard");
    } else {
      setError(result.error || "Қате");
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-12">
      <div className="card !p-8 shadow-book">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-burgundy text-gold">
            <BookOpen className="h-7 w-7" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-burgundy">
            {mode === "login" ? "Жүйеге кіру" : "Тіркелу"}
          </h1>
          <p className="mt-1 text-sm text-burgundy/60">
            Әдебиет Әлемі — мектеп әдебиет платформасы
          </p>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl bg-burgundy/5 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              mode === "login"
                ? "bg-burgundy text-cream"
                : "text-burgundy/70 hover:text-burgundy"
            }`}
          >
            Кіру
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError("");
            }}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              mode === "register"
                ? "bg-burgundy text-cream"
                : "text-burgundy/70 hover:text-burgundy"
            }`}
          >
            Тіркелу
          </button>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-burgundy">
                <User className="h-4 w-4" />
                Логин
              </label>
              <input
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="логиніңіз"
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
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-burgundy">
                  Аты
                </label>
                <input
                  className="input-field"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Атыңыз"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-burgundy">
                  Жөні
                </label>
                <input
                  className="input-field"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Жөніңіз"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-burgundy">
                <User className="h-4 w-4" />
                Логин
              </label>
              <input
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="логин таңдаңыз"
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
                placeholder="кемінде 4 таңба"
                autoComplete="new-password"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-burgundy">
                <UserPlus className="h-4 w-4" />
                Рөл
              </label>
              <select
                className="input-field"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
              >
                <option value="student">Оқушы</option>
                <option value="teacher">Мұғалім</option>
              </select>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary w-full">
              Тіркелу
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-burgundy/50">
          <Link href="/" className="hover:text-burgundy">
            ← Басты бетке оралу
          </Link>
        </p>
      </div>
    </div>
  );
}
