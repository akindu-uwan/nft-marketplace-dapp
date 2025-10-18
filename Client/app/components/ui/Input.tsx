import { cn } from "@/app/lib/cn";
export default function Input(props: any) {
  return (
    <input
      className={cn("h-9 w-56 bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 rounded-md px-3")}
      {...props}
    />
  );
}
