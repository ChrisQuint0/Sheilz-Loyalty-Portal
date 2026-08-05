import { cn } from "@/lib/utils"

interface AvatarPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  fallback: string
  size?: "sm" | "md" | "lg"
}

export function AvatarPlaceholder({ fallback, size = "md", className, ...props }: AvatarPlaceholderProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground uppercase overflow-hidden",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {fallback.substring(0, 2)}
    </div>
  )
}
