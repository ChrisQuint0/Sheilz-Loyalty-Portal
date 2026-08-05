import { Check } from "lucide-react"

interface PurchaseStatusBadgeProps {
  earned: boolean
}

export function PurchaseStatusBadge({ earned }: PurchaseStatusBadgeProps) {
  if (!earned) return null

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mt-2 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-200/50">
      <Check className="h-3.5 w-3.5" />
      <span>Loyalty Stamp Earned</span>
    </div>
  )
}
