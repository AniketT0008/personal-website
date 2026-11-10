"use client";

import { cn } from "@/lib/utils";

type TagPillProps = {
  label: string;
  className?: string;
  textClass?: string;
  bgClass?: string;
  selected?: boolean;
  ringClass?: string;
  onClick?: () => void;
  as?: "button" | "span";
  size?: "sm" | "md";
  "aria-pressed"?: boolean;
};

export function TagPill({
  label,
  className,
  textClass = "text-sky-300",
  bgClass = "bg-sky-400/15",
  selected = false,
  ringClass = "ring-sky-400/40",
  onClick,
  as,
  size = "sm",
  "aria-pressed": ariaPressed,
}: TagPillProps) {
  const Comp = as ?? (onClick ? "button" : "span");
  const sizeClasses =
    size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  return (
    <Comp
      type={Comp === "button" ? "button" : undefined}
      onClick={onClick}
      aria-pressed={ariaPressed ?? (onClick ? selected : undefined)}
      className={cn(
        "inline-flex items-center rounded-full font-mono font-medium transition-colors duration-200",
        sizeClasses,
        bgClass,
        textClass,
        onClick && "cursor-pointer hover:brightness-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        selected && `ring-1 ${ringClass} brightness-125`,
        className
      )}
    >
      {label}
    </Comp>
  );
}
