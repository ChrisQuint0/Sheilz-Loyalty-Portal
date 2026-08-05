import { PurchaseItem } from "@/data/mockPurchaseHistory"
import { PurchaseHistoryItem } from "./PurchaseHistoryItem"
import { EmptyPurchaseState } from "./EmptyPurchaseState"

interface PurchaseHistoryListProps {
  purchases: PurchaseItem[]
}

export function PurchaseHistoryList({ purchases }: PurchaseHistoryListProps) {
  if (purchases.length === 0) {
    return <EmptyPurchaseState />
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500 delay-150">
      {purchases.map((purchase) => (
        <PurchaseHistoryItem key={purchase.id} purchase={purchase} />
      ))}
    </div>
  )
}
