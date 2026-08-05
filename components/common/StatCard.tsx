import { cn } from "@/lib/utils"
import { SectionCard } from "./SectionCard"

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
}

export function StatCard({ title, value, description, icon, className, ...props }: StatCardProps) {
  return (
    <SectionCard className={cn("p-6", className)} {...props}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <span className="text-3xl font-bold tracking-tight text-foreground">{value}</span>
        {description && <span className="text-xs text-muted-foreground">{description}</span>}
      </div>
    </SectionCard>
  )
}
