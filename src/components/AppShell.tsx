"use client";

import { BootProvider } from "@/components/boot/BootContext";
import { BootLoader } from "@/components/boot/BootLoader";
import { SiteNav } from "@/components/SiteNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <BootProvider>
      <BootLoader />
      <SiteNav />
      <main className="page-shell">{children}</main>
    </BootProvider>
  );
}
