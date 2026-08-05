import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  backLink?: string
}

export function PageHeader({ title, description, backLink, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn("space-y-1 mb-6", className)} {...props}>
      <div className="flex items-center gap-2">
        {backLink && (
          <Link 
            href={backLink}
            className="p-1 -ml-1 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/50"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      </div>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  )
}
