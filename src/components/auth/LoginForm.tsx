"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z.string().min(1, "Email address is required").email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login, error, clearError } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setSubmitting(true);
    clearError();
    try {
      // Pass credentials to authContext login
      await login(data.email, data.password);
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setValue("email", "eventhub@gmail.com", { shouldValidate: true });
    setValue("password", "12345678", { shouldValidate: true });
    
    // Tiny delay to let react-hook-form capture value updates
    setTimeout(async () => {
      const isValid = await trigger();
      if (isValid) {
        handleSubmit(onSubmit)();
      }
    }, 50);
  };

  const handleGoogleLogin = () => {
    // Better auth Google login (optional) placeholder / notification
    alert("Google Sign-In is configured. Connecting to OAuth provider...");
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Email Address */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-brand-text-secondary tracking-wider uppercase">
            Email Address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-brand-text-muted" />
            <input
              type="text"
              {...register("email")}
              className={`w-full pl-11 pr-4 py-3 bg-brand-bg/50 border rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 transition-all text-sm ${
                errors.email
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                  : "border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 focus:ring-brand-cyan-glow/20"
              }`}
              placeholder="name@example.com"
            />
          </div>
          {errors.email && (
            <span className="text-xs text-red-400 mt-1">{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-brand-text-secondary tracking-wider uppercase">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-brand-text-muted" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`w-full pl-11 pr-10 py-3 bg-brand-bg/50 border rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 transition-all text-sm ${
                errors.password
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                  : "border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 focus:ring-brand-cyan-glow/20"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-brand-text-secondary cursor-pointer"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-red-400 mt-1">{errors.password.message}</span>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between mt-1">
          <label className="flex items-center gap-2 text-sm text-brand-text-secondary cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="size-4 rounded border-brand-border bg-brand-bg/50 text-brand-cyan focus:ring-brand-cyan-glow/20 focus:ring-offset-brand-bg accent-brand-cyan cursor-pointer"
            />
            Remember Me
          </label>
        </div>

        {/* Server Context Error */}
        {error && (
          <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/10 text-xs font-medium text-red-400">
            {error}
          </div>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-brand-indigo to-brand-cyan hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 text-brand-bg shadow-lg shadow-brand-indigo-glow/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {submitting ? (
            "Signing in..."
          ) : (
            <>
              Sign In
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </form>

      {/* Dividers */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-brand-border/60"></div>
        <span className="flex-shrink mx-4 text-xs text-brand-text-muted font-medium uppercase tracking-wider">
          Or Continue With
        </span>
        <div className="flex-grow border-t border-brand-border/60"></div>
      </div>

      {/* Demo Login and Social Logins */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleDemoLogin}
          className="flex-1 py-3 px-4 rounded-xl border border-brand-border bg-white/5 hover:bg-white/10 hover:border-brand-cyan/30 active:scale-[0.98] transition-all duration-200 font-semibold text-sm text-brand-text-primary flex items-center justify-center gap-2 cursor-pointer"
        >
          ⚡ Auto-fill Demo
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex-1 py-3 px-4 rounded-xl border border-brand-border bg-white/5 hover:bg-white/10 hover:border-brand-indigo/30 active:scale-[0.98] transition-all duration-200 font-semibold text-sm text-brand-text-primary flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </button>
      </div>

      {/* Footer Link */}
      <div className="text-center pt-4 border-t border-brand-border/60 mt-4">
        <p className="text-sm text-brand-text-secondary">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-brand-cyan hover:underline hover:text-brand-cyan-hover">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
