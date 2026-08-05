import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)} {...props}>
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 mb-6 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div>{action}</div>}
    </div>
  )
}
