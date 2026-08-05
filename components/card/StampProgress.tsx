import { Coffee } from "lucide-react"
import { cn } from "@/lib/utils"

interface StampProgressProps {
  current: number
  target: number
}

export function StampProgress({ current, target }: StampProgressProps) {
  // Generate an array of size `target`
  const stamps = Array.from({ length: target }, (_, i) => i)

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      {stamps.map((index) => {
        const isEarned = index < current
        return (
          <div 
            key={index}
            className={cn(
              "flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full transition-all duration-500",
              isEarned 
                ? "bg-primary text-primary-foreground shadow-md scale-110" 
                : "bg-muted text-muted-foreground/30 border-2 border-dashed border-muted-foreground/20"
            )}
          >
            <Coffee className={cn("h-5 w-5 sm:h-6 sm:w-6", isEarned && "animate-in zoom-in duration-300")} />
          </div>
        )
      })}
    </div>
  )
}
