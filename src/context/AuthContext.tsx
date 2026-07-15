"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateUser: (name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    authClient.getSession()
      .then(({ data }) => {
        if (data?.user) {
          setUser({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
          });
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    const { error: authError } = await authClient.signIn.email({ email, password });
    if (authError) {
      setError(authError.message || authError.code || "Login failed");
      throw authError;
    }
    const { data } = await authClient.getSession();
    if (data?.user) {
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      });
    }
    router.push("/");
  }, [router]);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setError(null);
    const { error: authError } = await authClient.signUp.email({ name, email, password });
    if (authError) {
      setError(authError.message || authError.code || "Signup failed");
      throw authError;
    }
    const { data } = await authClient.getSession();
    if (data?.user) {
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      });
    }
    router.push("/");
  }, [router]);

  const logout = useCallback(async () => {
    await authClient.signOut();
    setUser(null);
    router.push("/");
  }, [router]);

  const clearError = useCallback(() => setError(null), []);

  const updateUser = useCallback(async (name: string) => {
    const { error: authError } = await authClient.updateUser({ name });
    if (authError) {
      throw new Error(authError.message || authError.code || "Update failed");
    }
    setUser((prev) => (prev ? { ...prev, name } : prev));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout, clearError, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
