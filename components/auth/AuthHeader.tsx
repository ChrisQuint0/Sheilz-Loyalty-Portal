import { cn } from "@/lib/utils"

interface AuthHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

export function AuthHeader({ title, description, className, ...props }: AuthHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-2 text-center mb-6", className)} {...props}>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
