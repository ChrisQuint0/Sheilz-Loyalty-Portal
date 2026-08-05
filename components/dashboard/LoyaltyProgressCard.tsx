import { SectionCard } from "@/components/common/SectionCard"
import { ProgressBar } from "./ProgressBar"
import { Coffee } from "lucide-react"

interface LoyaltyProgressCardProps {
  currentStamps: number
  targetStamps: number
}

export function LoyaltyProgressCard({ currentStamps, targetStamps }: LoyaltyProgressCardProps) {
  const remaining = Math.max(targetStamps - currentStamps, 0)
  const isComplete = currentStamps >= targetStamps

  return (
    <SectionCard className="p-6 sm:p-8 relative overflow-hidden bg-primary text-primary-foreground border-none">
      {/* Decorative background circle */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Coffee className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Loyalty Progress</h2>
        </div>

        <ProgressBar 
          current={currentStamps} 
          total={targetStamps} 
          className="mb-6 [&_div.bg-muted]:bg-white/20 [&_div.bg-primary]:bg-white [&_span]:text-primary-foreground/90" 
        />

        <p className="text-sm font-medium text-primary-foreground/90">
          {isComplete 
            ? "You have a FREE drink waiting!" 
            : `${remaining} more purchase${remaining === 1 ? '' : 's'} until your FREE drink!`}
        </p>
      </div>
    </SectionCard>
  )
}
