import { cn } from "@/lib/utils"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  current: number
  total: number
}

export function ProgressBar({ current, total, className, ...props }: ProgressBarProps) {
  const percentage = Math.min(Math.round((current / total) * 100), 100)

  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="flex justify-between text-sm font-medium mb-2">
        <span>{current} / {total} Purchases</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
