import { cn } from "@/lib/utils"

export function PageContainer({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-4xl p-4 md:p-6 lg:p-8", className)} {...props}>
      {children}
    </div>
  )
}
