import { cn } from "@/utils/cn";

interface SpinnerProps { size?: "sm" | "md" | "lg"; className?: string; }

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div className={cn("animate-spin rounded-full border-2 border-current border-t-transparent",
      size === "sm" && "h-4 w-4", size === "md" && "h-6 w-6", size === "lg" && "h-10 w-10", className)} />
  );
}

export function PageLoader() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" className="text-brand-500" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
