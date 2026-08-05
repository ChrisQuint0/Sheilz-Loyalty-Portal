import { Check, Gift } from "lucide-react"

interface PurchaseStatusBadgeProps {
  earned: boolean
  isRewardRedeemed?: boolean
}

export function PurchaseStatusBadge({ earned, isRewardRedeemed }: PurchaseStatusBadgeProps) {
  if (isRewardRedeemed) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mt-2 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200/50">
        <Gift className="h-3.5 w-3.5" />
        <span>Reward Redeemed</span>
      </div>
    )
  }

  if (!earned) return null

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mt-2 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-200/50">
      <Check className="h-3.5 w-3.5" />
      <span>Loyalty Stamp Earned</span>
    </div>
  )
}
