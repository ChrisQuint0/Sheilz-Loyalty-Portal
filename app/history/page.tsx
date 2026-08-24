import { Metadata } from "next";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { PurchaseSummaryCard } from "@/components/history/PurchaseSummaryCard";
import { PurchaseHistoryList } from "@/components/history/PurchaseHistoryList";
import { DashboardDataCache } from "@/components/dashboard/DashboardDataCache";

import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard-data";

export const metadata: Metadata = {
  title: "Purchase History | Sheilz Loyalty Portal",
  description: "View your recent loyalty purchases at Sheilz Coffee",
};

export default async function HistoryPage() {
  const user = await requireUser();
  const dashboard = await getDashboardData(user.email);

  const purchaseSummary = {
    totalPurchases: dashboard.card.totalPurchases,
    currentStamps: dashboard.loyalty.currentStamps,
    targetStamps: dashboard.loyalty.targetStamps,
    lastPurchaseDate:
      dashboard.recentPurchases[0]?.date ?? "No recent purchases",
  };

  const purchaseHistory = dashboard.recentPurchases.map((purchase, index) => ({
    id: Number(purchase.id) || index + 1,
    drink: purchase.drink,
    purchaseDate: purchase.date,
    stampEarned: purchase.earnedStamp,
    isRewardRedeemed: purchase.isRewardRedeemed,
  }));

  return (
    <AppLayout>
      <PageContainer className="max-w-3xl mx-auto pb-24 lg:pb-8">
        <DashboardDataCache data={dashboard} />

        <PageHeader
          title="Purchase History"
          description="View your recent loyalty purchases"
          backLink="/dashboard"
        />

        <div className="mt-6 mb-8">
          <PurchaseSummaryCard summary={purchaseSummary} />
        </div>

        <div>
          <h2 className="text-lg font-semibold tracking-tight mb-4">
            Purchase Timeline
          </h2>
          <PurchaseHistoryList purchases={purchaseHistory} />
        </div>
      </PageContainer>
    </AppLayout>
  );
}
