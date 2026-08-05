import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export function LoadingState({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 space-y-4", className)} {...props}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
    </div>
  )
}
