import { cn } from "@/app/lib/cn";

export default function Button(
    { className,
        variant = "solid",
        size = "md",
        children,
        ...props }: {
            className?: string;
            variant?: "solid" | "outline" | "ghost";
            size?: "sm" | "md" | "lg";
            children: React.ReactNode;
        }
) {

    const base = "inline-flex items-center justify-center gap-2 font-medium transition-colors focus:outline-none rounded-xl";
    const variants = {
        solid: "bg-white text-black hover:bg-zinc-200",
        outline: "border border-zinc-700 text-zinc-200 hover:bg-zinc-800",
        ghost: "text-zinc-300 hover:text-white",
    };
    const sizes = {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base rounded-2xl",
    };

    return <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {children}
    </button>
}