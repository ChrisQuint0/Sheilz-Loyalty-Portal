import { Metadata } from "next"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageContainer } from "@/components/layout/PageContainer"
import { PageHeader } from "@/components/common/PageHeader"
import { PurchaseSummaryCard } from "@/components/history/PurchaseSummaryCard"
import { PurchaseHistoryList } from "@/components/history/PurchaseHistoryList"

import { mockPurchaseSummary, mockPurchaseHistory } from "@/data/mockPurchaseHistory"

export const metadata: Metadata = {
  title: "Purchase History | Sheilz Loyalty Portal",
  description: "View your recent loyalty purchases at Sheilz Coffee",
}

export default function HistoryPage() {
  return (
    <AppLayout>
      <PageContainer className="max-w-3xl mx-auto pb-24 lg:pb-8">
        <PageHeader 
          title="Purchase History" 
          description="View your recent loyalty purchases"
          backLink="/dashboard"
        />

        <div className="mt-6 mb-8">
          <PurchaseSummaryCard summary={mockPurchaseSummary} />
        </div>

        <div>
          <h2 className="text-lg font-semibold tracking-tight mb-4">Purchase Timeline</h2>
          <PurchaseHistoryList purchases={mockPurchaseHistory} />
        </div>

      </PageContainer>
    </AppLayout>
  )
}
