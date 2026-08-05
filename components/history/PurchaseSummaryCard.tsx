import { SectionCard } from "@/components/common/SectionCard"
import { PurchaseSummary } from "@/data/mockPurchaseHistory"

interface PurchaseSummaryCardProps {
  summary: PurchaseSummary
}

export function PurchaseSummaryCard({ summary }: PurchaseSummaryCardProps) {
  return (
    <SectionCard className="p-6 divide-y sm:divide-y-0 sm:divide-x flex flex-col sm:flex-row sm:items-center text-center animate-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex-1 py-4 sm:py-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Total Purchases</p>
        <p className="text-3xl font-bold text-foreground">{summary.totalPurchases}</p>
      </div>

      <div className="flex-1 py-4 sm:py-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Current Progress</p>
        <div className="flex items-baseline justify-center gap-1">
          <p className="text-3xl font-bold text-primary">{summary.currentStamps}</p>
          <p className="text-sm font-medium text-muted-foreground">/ {summary.targetStamps}</p>
        </div>
      </div>

      <div className="flex-1 py-4 sm:py-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Last Purchase</p>
        <p className="text-lg font-medium text-foreground">{summary.lastPurchaseDate}</p>
      </div>

    </SectionCard>
  )
}
