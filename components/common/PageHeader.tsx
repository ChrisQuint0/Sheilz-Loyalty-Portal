import { cn } from "@/lib/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

export function PageHeader({ title, description, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn("space-y-1 mb-6", className)} {...props}>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  )
}
