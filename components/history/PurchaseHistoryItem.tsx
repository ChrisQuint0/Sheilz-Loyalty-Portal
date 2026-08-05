import { Coffee, Calendar } from "lucide-react"
import { PurchaseItem } from "@/data/mockPurchaseHistory"
import { PurchaseStatusBadge } from "./PurchaseStatusBadge"

interface PurchaseHistoryItemProps {
  purchase: PurchaseItem
}

export function PurchaseHistoryItem({ purchase }: PurchaseHistoryItemProps) {
  return (
    <div className="group bg-card rounded-xl p-4 sm:p-5 border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 shrink-0 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          <Coffee className="h-5 w-5" />
        </div>
        
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">{purchase.purchaseDate}</h3>
          </div>

          <PurchaseStatusBadge earned={purchase.stampEarned} isRewardRedeemed={purchase.isRewardRedeemed} />
        </div>
      </div>
    </div>
  )
}
