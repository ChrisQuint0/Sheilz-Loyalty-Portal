import { cn } from "@/lib/utils"

export function SectionCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)} {...props}>
      {children}
    </div>
  )
}
