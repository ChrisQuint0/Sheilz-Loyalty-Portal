import { SectionCard } from "@/components/common/SectionCard"
import { Gift, Award } from "lucide-react"

interface RewardsSummaryCardProps {
  availableRewards: number
  redeemedRewards: number
}

export function RewardsSummaryCard({ availableRewards, redeemedRewards }: RewardsSummaryCardProps) {
  return (
    <SectionCard className="p-6 h-full flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-6">
        <Gift className="h-5 w-5 text-primary" />
        <h2 className="font-semibold text-lg tracking-tight">Rewards</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
          <span className="text-sm font-medium">Available Rewards</span>
          <span className="text-2xl font-bold text-primary">{availableRewards}</span>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-xl">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Redeemed Rewards</span>
          </div>
          <span className="text-lg font-semibold text-muted-foreground">{redeemedRewards}</span>
        </div>
      </div>
    </SectionCard>
  )
}
