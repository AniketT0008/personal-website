import type { ReactNode } from "react";
import { SiteNav } from "@/components/SiteNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="page-shell simple-main">{children}</main>
    </>
  );
}
