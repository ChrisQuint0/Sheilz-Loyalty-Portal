import { cn } from "@/lib/utils"

export function AuthCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border bg-card text-card-foreground shadow-lg p-6 sm:p-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
