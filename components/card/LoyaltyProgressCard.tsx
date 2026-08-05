import { SectionCard } from "@/components/common/SectionCard"
import { ProgressBar } from "@/components/dashboard/ProgressBar"
import { StampProgress } from "./StampProgress"

interface LoyaltyProgressCardProps {
  currentStamps: number
  targetStamps: number
}

export function LoyaltyProgressCard({ currentStamps, targetStamps }: LoyaltyProgressCardProps) {
  const remaining = Math.max(targetStamps - currentStamps, 0)
  const isComplete = currentStamps >= targetStamps

  return (
    <SectionCard className="p-6">
      <h2 className="text-lg font-semibold tracking-tight text-center mb-6">Loyalty Progress</h2>
      
      <StampProgress current={currentStamps} target={targetStamps} />
      
      <ProgressBar current={currentStamps} total={targetStamps} className="mb-4" />
      
      <p className="text-sm text-center font-medium text-muted-foreground">
        {isComplete 
          ? "You have a FREE drink waiting!" 
          : `${remaining} more purchase${remaining === 1 ? '' : 's'} until your FREE drink.`}
      </p>
    </SectionCard>
  )
}
