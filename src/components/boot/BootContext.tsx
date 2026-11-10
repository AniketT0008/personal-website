"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type BootContextValue = {
  done: boolean;
  markDone: () => void;
};

const BootContext = createContext<BootContextValue>({
  done: false,
  markDone: () => {},
});

const STORAGE_KEY = "aniket-boot-done";

export function BootProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);

  const markDone = useCallback(() => {
    setDone(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ done, markDone }), [done, markDone]);

  return <BootContext.Provider value={value}>{children}</BootContext.Provider>;
}

export function useBootDone() {
  return useContext(BootContext).done;
}

export function useBoot() {
  return useContext(BootContext);
}

export function shouldSkipBoot(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return true;
  } catch {
    /* ignore */
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return false;
}
