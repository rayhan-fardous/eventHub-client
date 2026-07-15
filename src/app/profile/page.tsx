"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  Check,
  AlertCircle,
  ShieldCheck,
  LayoutDashboard,
  CalendarDays,
  LogOut,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";
import { fetchUserBookings } from "@/lib/api";
import Footer from "@/components/Footer";

// ─── Validation schemas ─────────────────────────────────────────────────────

const profileSchema = z.object({
  name: z.string().min(2, "Display name must be at least 2 characters"),
});
type ProfileValues = z.infer<typeof profileSchema>;

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type PasswordValues = z.infer<typeof passwordSchema>;

// ─── Avatar initials helper ──────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─── Inline feedback badge ───────────────────────────────────────────────────

function FeedbackBadge({ type, message }: { type: "success" | "error"; message: string }) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-medium ${
        type === "success"
          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          : "bg-red-500/10 border-red-500/20 text-red-400"
      }`}
    >
      {type === "success" ? (
        <Check className="size-3.5 shrink-0" />
      ) : (
        <AlertCircle className="size-3.5 shrink-0" />
      )}
      {message}
    </div>
  );
}

// ─── Password input with show/hide toggle ────────────────────────────────────

function PasswordInput({
  id,
  placeholder,
  registration,
  error,
}: {
  id: string;
  placeholder: string;
  registration: ReturnType<ReturnType<typeof useForm<PasswordValues>>["register"]>;
  error?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-brand-text-muted" />
        <input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          {...registration}
          className={`w-full pl-11 pr-10 py-3 bg-brand-bg/50 border rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 transition-all text-sm ${
            error
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
              : "border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 focus:ring-brand-cyan-glow/20"
          }`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-brand-text-secondary cursor-pointer"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}

// ─── Main Profile Page ───────────────────────────────────────────────────────

export default function ProfilePage() {
  const { user, loading, logout, updateUser } = useAuth();
  const router = useRouter();

  const [bookingsCount, setBookingsCount] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  // Profile form feedback
  const [profileStatus, setProfileStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);

  // Password form feedback
  const [pwStatus, setPwStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [pwSaving, setPwSaving] = useState(false);

  // ── Profile form ──────────────────────────────────────────────────────────

  const profileForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "" },
  });

  // Pre-fill when user is loaded
  useEffect(() => {
    if (user) {
      profileForm.reset({ name: user.name });
    }
  }, [user, profileForm]);

  // ── Password form ─────────────────────────────────────────────────────────

  const pwForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  // ── Auth redirect ─────────────────────────────────────────────────────────

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  // ── Stats ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (user) {
      fetchUserBookings(user.email)
        .then((data) => {
          setBookingsCount(data.length);
          setTotalSpent(data.reduce((s, b) => s + b.eventPrice, 0));
        })
        .catch(() => {});
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="size-12 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Handlers ──────────────────────────────────────────────────────────────

  const onSaveProfile = async (data: ProfileValues) => {
    if (data.name === user.name) {
      setProfileStatus({ type: "success", msg: "Profile is already up to date." });
      return;
    }
    setProfileSaving(true);
    setProfileStatus(null);
    try {
      await updateUser(data.name);
      setProfileStatus({ type: "success", msg: "Display name updated successfully!" });
    } catch (err: any) {
      setProfileStatus({ type: "error", msg: err?.message || "Failed to update profile." });
    } finally {
      setProfileSaving(false);
    }
  };

  const onChangePassword = async (data: PasswordValues) => {
    setPwSaving(true);
    setPwStatus(null);
    try {
      const { error: authErr } = await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      if (authErr) throw new Error(authErr.message || authErr.code || "Password change failed");
      setPwStatus({ type: "success", msg: "Password changed successfully!" });
      pwForm.reset();
    } catch (err: any) {
      setPwStatus({ type: "error", msg: err?.message || "Failed to change password." });
    } finally {
      setPwSaving(false);
    }
  };

  const initials = getInitials(user.name);
  const joinedYear = new Date().getFullYear(); // better-auth doesn't expose createdAt on client by default

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary flex flex-col relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-brand-indigo-glow filter blur-[130px] opacity-30 animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 -z-10 h-80 w-80 rounded-full bg-brand-cyan-glow/10 filter blur-[110px] pointer-events-none" />

      <main className="flex-grow mx-auto max-w-7xl w-full px-4 pt-12 pb-20 sm:px-6 lg:px-8">

        {/* Page header */}
        <div className="mb-10 border-b border-brand-border/60 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-brand-cyan bg-brand-cyan-glow/10 border border-brand-cyan/20 uppercase tracking-wider mb-3">
            <Sparkles className="size-3.5" />
            My Account
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Profile Settings
          </h1>
          <p className="mt-2 text-sm text-brand-text-secondary">
            Manage your personal information and account security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left Sidebar ─────────────────────────────────────────────── */}
          <aside className="flex flex-col gap-6">

            {/* Avatar card */}
            <div className="bg-brand-panel/50 border border-brand-border rounded-[2rem] p-8 flex flex-col items-center text-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="size-24 rounded-full bg-gradient-to-br from-brand-indigo to-brand-cyan flex items-center justify-center text-3xl font-extrabold text-white shadow-lg shadow-brand-indigo-glow/30 select-none">
                  {initials}
                </div>
                <div className="absolute -bottom-1 -right-1 size-7 rounded-full bg-emerald-500 border-2 border-brand-bg flex items-center justify-center">
                  <Check className="size-3.5 text-white" />
                </div>
              </div>

              <div>
                <p className="text-lg font-bold text-brand-text-primary">{user.name}</p>
                <p className="text-xs text-brand-text-muted mt-0.5 break-all">{user.email}</p>
                <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-brand-cyan-glow/10 text-brand-cyan border border-brand-cyan/20 uppercase tracking-wider">
                  <ShieldCheck className="size-3" />
                  Member {joinedYear}
                </div>
              </div>

              {/* Stats */}
              <div className="w-full grid grid-cols-2 gap-3 pt-2 border-t border-brand-border/60">
                <div className="bg-brand-bg/50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-black text-brand-text-primary">{bookingsCount}</p>
                  <p className="text-[10px] text-brand-text-muted font-semibold uppercase tracking-wider mt-0.5">
                    Bookings
                  </p>
                </div>
                <div className="bg-brand-bg/50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-black text-brand-cyan">৳{totalSpent.toLocaleString()}</p>
                  <p className="text-[10px] text-brand-text-muted font-semibold uppercase tracking-wider mt-0.5">
                    Total Spent
                  </p>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-brand-panel/50 border border-brand-border rounded-[2rem] p-5 flex flex-col gap-2">
              <p className="text-xs font-bold text-brand-text-muted uppercase tracking-wider px-2 mb-1">
                Quick Links
              </p>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-brand-text-secondary hover:text-brand-text-primary hover:bg-white/5 transition-all group"
              >
                <LayoutDashboard className="size-4 text-brand-cyan group-hover:scale-110 transition-transform" />
                My Dashboard
                <ArrowRight className="size-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/events"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-brand-text-secondary hover:text-brand-text-primary hover:bg-white/5 transition-all group"
              >
                <CalendarDays className="size-4 text-brand-cyan group-hover:scale-110 transition-transform" />
                Browse Events
                <ArrowRight className="size-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-brand-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-all group w-full text-left cursor-pointer mt-2 border-t border-brand-border/60 pt-4"
              >
                <LogOut className="size-4 group-hover:scale-110 transition-transform" />
                Sign Out
              </button>
            </div>
          </aside>

          {/* ── Right: Edit Forms ────────────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* ── Edit Profile Info ──────────────────────────────────────── */}
            <section className="bg-brand-panel/50 border border-brand-border rounded-[2rem] p-7 sm:p-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-brand-border/60">
                <div className="p-2 rounded-xl bg-brand-indigo/10 border border-brand-border">
                  <User className="size-4 text-brand-indigo" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-brand-text-primary">Personal Information</h2>
                  <p className="text-xs text-brand-text-muted mt-0.5">Update your display name</p>
                </div>
              </div>

              <form onSubmit={profileForm.handleSubmit(onSaveProfile)} className="flex flex-col gap-5">
                {/* Name field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-brand-text-secondary tracking-wider uppercase">
                    Display Name
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-brand-text-muted" />
                    <input
                      {...profileForm.register("name")}
                      type="text"
                      className={`w-full pl-11 pr-4 py-3 bg-brand-bg/50 border rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 transition-all text-sm ${
                        profileForm.formState.errors.name
                          ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                          : "border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 focus:ring-brand-cyan-glow/20"
                      }`}
                      placeholder="Your full name"
                    />
                  </div>
                  {profileForm.formState.errors.name && (
                    <span className="text-xs text-red-400">
                      {profileForm.formState.errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email field (read-only) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-brand-text-secondary tracking-wider uppercase">
                    Email Address
                    <span className="ml-2 normal-case font-normal text-brand-text-muted">(read-only)</span>
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-brand-text-muted" />
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full pl-11 pr-4 py-3 bg-brand-bg/30 border border-brand-border rounded-xl text-brand-text-muted text-sm cursor-not-allowed select-none"
                    />
                  </div>
                  <p className="text-[11px] text-brand-text-muted">
                    Email changes require identity verification and are not available at this time.
                  </p>
                </div>

                {/* Feedback */}
                {profileStatus && (
                  <FeedbackBadge type={profileStatus.type} message={profileStatus.msg} />
                )}

                <button
                  type="submit"
                  disabled={profileSaving}
                  className="self-start flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-indigo to-brand-cyan text-brand-bg hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 shadow-lg shadow-brand-indigo-glow/20 cursor-pointer"
                >
                  <Save className="size-4" />
                  {profileSaving ? "Saving…" : "Save Changes"}
                </button>
              </form>
            </section>

            {/* ── Change Password ──────────────────────────────────────────── */}
            <section className="bg-brand-panel/50 border border-brand-border rounded-[2rem] p-7 sm:p-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-brand-border/60">
                <div className="p-2 rounded-xl bg-brand-cyan/10 border border-brand-border">
                  <Lock className="size-4 text-brand-cyan" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-brand-text-primary">Change Password</h2>
                  <p className="text-xs text-brand-text-muted mt-0.5">
                    Use a strong password you don&apos;t use elsewhere
                  </p>
                </div>
              </div>

              <form onSubmit={pwForm.handleSubmit(onChangePassword)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-brand-text-secondary tracking-wider uppercase">
                    Current Password
                  </label>
                  <PasswordInput
                    id="currentPassword"
                    placeholder="Your current password"
                    registration={pwForm.register("currentPassword")}
                    error={pwForm.formState.errors.currentPassword?.message}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-brand-text-secondary tracking-wider uppercase">
                      New Password
                    </label>
                    <PasswordInput
                      id="newPassword"
                      placeholder="At least 6 characters"
                      registration={pwForm.register("newPassword")}
                      error={pwForm.formState.errors.newPassword?.message}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-brand-text-secondary tracking-wider uppercase">
                      Confirm New Password
                    </label>
                    <PasswordInput
                      id="confirmPassword"
                      placeholder="Repeat new password"
                      registration={pwForm.register("confirmPassword")}
                      error={pwForm.formState.errors.confirmPassword?.message}
                    />
                  </div>
                </div>

                {/* Feedback */}
                {pwStatus && (
                  <FeedbackBadge type={pwStatus.type} message={pwStatus.msg} />
                )}

                <button
                  type="submit"
                  disabled={pwSaving}
                  className="self-start flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-indigo to-brand-cyan text-brand-bg hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 shadow-lg shadow-brand-indigo-glow/20 cursor-pointer"
                >
                  <ShieldCheck className="size-4" />
                  {pwSaving ? "Updating…" : "Update Password"}
                </button>
              </form>
            </section>

          
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
