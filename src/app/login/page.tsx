"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, TextField, Label, Input, Button, FieldError } from "@heroui/react";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { user, loading, login, error, clearError } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (user) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    clearError();
    try {
      await login(email, password);
    } catch {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <Card variant="default" className="w-full max-w-sm">
        <Card.Header className="flex flex-col items-center gap-2 pb-0 pt-8">
          <Card.Title className="text-2xl font-bold">Welcome back</Card.Title>
          <Card.Description className="text-sm text-gray-500">
            Sign in to your account
          </Card.Description>
        </Card.Header>
        <Card.Content className="pt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <TextField isRequired fullWidth value={email} onChange={setEmail} type="email" name="email">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <Input className="pl-10" placeholder="you@example.com" />
              </div>
              <FieldError />
            </TextField>

            <TextField isRequired fullWidth value={password} onChange={setPassword} type="password" name="password">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <Input className="pl-10" placeholder="Enter your password" />
              </div>
              <FieldError />
            </TextField>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button type="submit" variant="primary" fullWidth isDisabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Card.Content>
        <Card.Footer className="justify-center pb-8 pt-2">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}
