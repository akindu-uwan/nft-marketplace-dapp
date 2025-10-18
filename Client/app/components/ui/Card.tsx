import * as React from "react";
import { cn } from "@/app/lib/cn";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...rest }: DivProps) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/40",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...rest }: DivProps) {
  return (
    <div {...rest} className={cn("p-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...rest }: DivProps) {
  return (
    <h4 {...rest} className={cn("font-semibold", className)}>
      {children}
    </h4>
  );
}

export function CardContent({ className, children, ...rest }: DivProps) {
  return (
    <div {...rest} className={cn("p-4", className)}>
      {children}
    </div>
  );
}
