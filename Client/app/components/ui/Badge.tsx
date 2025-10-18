import { cn } from "@/app/lib/cn";
export default function Badge({ className, children }: {className?: string; children?: React.ReactNode}) {
  return (
    <span className={cn("inline-flex items-center rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-zinc-100", className)}>
      {children}
    </span>
  );
}
