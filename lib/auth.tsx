"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SEED_USERS, type AppUser, type Role } from "./data";

const SESSION_KEY = "adebiet-alemi-user";
const USERS_KEY = "adebiet-alemi-users";

export interface AuthUser {
  username: string;
  firstName: string;
  lastName: string;
  name: string;
  role: Role;
}

interface RegisterInput {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: Role;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (username: string, password: string) => { ok: boolean; error?: string };
  register: (input: RegisterInput) => { ok: boolean; error?: string };
  logout: () => void;
  isTeacher: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function toAuthUser(u: AppUser): AuthUser {
  return {
    username: u.username,
    firstName: u.firstName,
    lastName: u.lastName,
    name: u.name || `${u.firstName} ${u.lastName}`.trim(),
    role: u.role,
  };
}

function loadStoredUsers(): AppUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as AppUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function allUsers(): AppUser[] {
  const stored = loadStoredUsers();
  const byUsername = new Map<string, AppUser>();
  for (const u of SEED_USERS) byUsername.set(u.username, u);
  for (const u of stored) byUsername.set(u.username, u);
  return Array.from(byUsername.values());
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AuthUser;
        if (parsed?.username && parsed?.role) {
          if (!parsed.name && (parsed.firstName || parsed.lastName)) {
            parsed.name = `${parsed.firstName || ""} ${parsed.lastName || ""}`.trim();
          }
          setUser(parsed);
        }
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((username: string, password: string) => {
    const found = allUsers().find(
      (u) => u.username === username.trim() && u.password === password
    );
    if (!found) {
      return { ok: false, error: "Қате логин немесе құпия сөз" };
    }
    const authUser = toAuthUser(found);
    localStorage.setItem(SESSION_KEY, JSON.stringify(authUser));
    setUser(authUser);
    return { ok: true };
  }, []);

  const register = useCallback((input: RegisterInput) => {
    const firstName = input.firstName.trim();
    const lastName = input.lastName.trim();
    const username = input.username.trim();
    const password = input.password;

    if (!firstName || !lastName || !username || !password) {
      return { ok: false, error: "Барлық өрістерді толтырыңыз" };
    }
    if (password.length < 4) {
      return { ok: false, error: "Құпия сөз кемінде 4 таңба болуы керек" };
    }
    if (allUsers().some((u) => u.username === username)) {
      return { ok: false, error: "Бұл логин бос емес" };
    }

    const newUser: AppUser = {
      username,
      password,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      role: input.role,
    };
    const stored = loadStoredUsers().filter((u) => u.username !== username);
    stored.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(stored));

    const authUser = toAuthUser(newUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(authUser));
    setUser(authUser);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      isTeacher: user?.role === "teacher",
      isStudent: user?.role === "student",
    }),
    [user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
