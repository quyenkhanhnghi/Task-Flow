"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
}

export function ProviderSession({ children }: SessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
