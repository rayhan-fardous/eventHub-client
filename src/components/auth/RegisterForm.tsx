"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const registerSchema = z
  .object({
    name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().min(1, "Email address is required").email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const { signup, error, clearError } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setSubmitting(true);
    clearError();
    try {
      // Pass fields to authContext signup
      await signup(data.name, data.email, data.password);
    } catch (err) {
      console.error("Registration failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-brand-text-secondary tracking-wider uppercase">
            Full Name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-brand-text-muted" />
            <input
              type="text"
              {...register("name")}
              className={`w-full pl-11 pr-4 py-3 bg-brand-bg/50 border rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 transition-all text-sm ${
                errors.name
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                  : "border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 focus:ring-brand-cyan-glow/20"
              }`}
              placeholder="John Doe"
            />
          </div>
          {errors.name && (
            <span className="text-xs text-red-400 mt-1">{errors.name.message}</span>
          )}
        </div>

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
              placeholder="Choose a strong password"
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

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-brand-text-secondary tracking-wider uppercase">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-brand-text-muted" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className={`w-full pl-11 pr-10 py-3 bg-brand-bg/50 border rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 transition-all text-sm ${
                errors.confirmPassword
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                  : "border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 focus:ring-brand-cyan-glow/20"
              }`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-brand-text-secondary cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-xs text-red-400 mt-1">{errors.confirmPassword.message}</span>
          )}
        </div>

        {/* Server Context Error */}
        {error && (
          <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/10 text-xs font-medium text-red-400">
            {error}
          </div>
        )}

        {/* Register Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-brand-indigo to-brand-cyan hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 text-brand-bg shadow-lg shadow-brand-indigo-glow/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {submitting ? (
            "Creating account..."
          ) : (
            <>
              Create Account
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </form>

      {/* Footer Link */}
      <div className="text-center pt-4 border-t border-brand-border/60 mt-4">
        <p className="text-sm text-brand-text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-brand-cyan hover:underline hover:text-brand-cyan-hover">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
