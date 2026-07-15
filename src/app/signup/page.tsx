"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, TextField, Label, Input, Button, FieldError } from "@heroui/react";
import { User, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const { user, loading, signup, error, clearError } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
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
      await signup(name, email, password);
    } catch {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex flex-1 items-center justify-center px-4 py-16 sm:py-24 bg-brand-bg overflow-hidden min-h-[calc(100vh-64px)]">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-80 w-80 rounded-full bg-brand-indigo-glow filter blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 -z-10 h-72 w-72 rounded-full bg-brand-cyan-glow/10 filter blur-[80px]" />

      <Card variant="default" className="w-full max-w-md bg-brand-panel/80 border border-brand-border rounded-[2rem] shadow-2xl relative overflow-hidden p-4 sm:p-8 backdrop-blur-md">
        <Card.Header className="flex flex-col items-center gap-2 pb-0 pt-6">
          <div className="p-2 rounded-2xl bg-gradient-to-br from-brand-indigo/10 to-brand-cyan/10 border border-brand-border text-brand-cyan mb-2">
            <Sparkles className="size-5" />
          </div>
          <Card.Title className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-text-primary text-center">
            Create Account
          </Card.Title>
          <Card.Description className="text-sm text-brand-text-secondary text-center">
            Join EventHub today to manage dynamic events
          </Card.Description>
        </Card.Header>

        <Card.Content className="pt-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <TextField isRequired fullWidth value={name} onChange={setName} name="name" className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-brand-text-secondary tracking-wider uppercase">
                Full Name
              </Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-brand-text-muted" />
                <Input
                  className="w-full pl-11 pr-4 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm"
                  placeholder="John Doe"
                />
              </div>
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            <TextField isRequired fullWidth value={email} onChange={setEmail} type="email" name="email" className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-brand-text-secondary tracking-wider uppercase">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-brand-text-muted" />
                <Input
                  className="w-full pl-11 pr-4 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm"
                  placeholder="name@example.com"
                />
              </div>
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            <TextField isRequired fullWidth value={password} onChange={setPassword} type="password" name="password" className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-brand-text-secondary tracking-wider uppercase">
                Password
              </Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-brand-text-muted" />
                <Input
                  className="w-full pl-11 pr-4 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm"
                  placeholder="Choose a strong password"
                />
              </div>
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            {error && (
              <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/10 text-xs font-medium text-red-400">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isDisabled={submitting}
              className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-brand-indigo to-brand-cyan hover:brightness-110 active:scale-[0.98] transition-all duration-200 text-brand-bg shadow-lg shadow-brand-indigo-glow/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              {submitting ? (
                "Creating account..."
              ) : (
                <>
                  Create Account
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </form>
        </Card.Content>

        <Card.Footer className="justify-center pb-6 pt-4 border-t border-brand-border/60 mt-6">
          <p className="text-sm text-brand-text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-brand-cyan hover:underline hover:text-brand-cyan-hover">
              Sign in
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}
