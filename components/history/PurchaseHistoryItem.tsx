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
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-foreground truncate">{purchase.drink}</h3>
            {purchase.orderNumber && (
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md shrink-0">
                {purchase.orderNumber}
              </span>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{purchase.purchaseDate}</span>
            </div>
          </div>

          <PurchaseStatusBadge earned={purchase.stampEarned} />
        </div>
      </div>
    </div>
  )
}
