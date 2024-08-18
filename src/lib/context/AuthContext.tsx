"use client";
import { SessionProvider } from "next-auth/react";

type props = {
  children: React.ReactNode;
};

export default function AuthContext({ children }: props) {
  return <SessionProvider>{children}</SessionProvider>;
}
