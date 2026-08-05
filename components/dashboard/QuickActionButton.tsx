import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface QuickActionButtonProps {
  icon: LucideIcon
  label: string
  href: string
  className?: string
}

export function QuickActionButton({ icon: Icon, label, href, className }: QuickActionButtonProps) {
  return (
    <Link 
      href={href}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-xl border bg-card text-card-foreground shadow-sm hover:border-primary/50 hover:bg-muted/30 transition-all group",
        className
      )}
    >
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
        <Icon className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
      </div>
      <span className="text-sm font-medium text-center">{label}</span>
    </Link>
  )
}
