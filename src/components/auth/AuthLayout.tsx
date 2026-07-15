"use client";

import React from "react";
import { Card } from "@heroui/react";
import { Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function AuthLayout({
  children,
  title,
  description,
  icon = <Sparkles className="size-5" />,
}: AuthLayoutProps) {
  return (
    <div className="relative flex flex-1 items-center justify-center px-4 py-16 sm:py-24 bg-brand-bg overflow-hidden min-h-[calc(100vh-64px)]">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-80 w-80 rounded-full bg-brand-indigo-glow filter blur-[100px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-10 right-10 -z-10 h-72 w-72 rounded-full bg-brand-cyan-glow/10 filter blur-[80px] pointer-events-none" />

      <Card
        variant="default"
        className="w-full max-w-md bg-brand-panel/80 border border-brand-border rounded-[2rem] shadow-2xl relative overflow-hidden p-4 sm:p-8 backdrop-blur-md"
      >
        <Card.Header className="flex flex-col items-center gap-2 pb-0 pt-6">
          <div className="p-2 rounded-2xl bg-gradient-to-br from-brand-indigo/10 to-brand-cyan/10 border border-brand-border text-brand-cyan mb-2">
            {icon}
          </div>
          <Card.Title className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-text-primary text-center">
            {title}
          </Card.Title>
          <Card.Description className="text-sm text-brand-text-secondary text-center">
            {description}
          </Card.Description>
        </Card.Header>

        <Card.Content className="pt-8">
          {children}
        </Card.Content>
      </Card>
    </div>
  );
}
