import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardDataCache } from "@/components/dashboard/DashboardDataCache";
import { LoyaltyProgressCard } from "@/components/dashboard/LoyaltyProgressCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { QuickActions } from "@/components/dashboard/QuickActions";

import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard-data";

export default async function DashboardPage() {
  const user = await requireUser();
  const dashboard = await getDashboardData(user.email);

  return (
    <AppLayout>
      <PageContainer className="animate-in fade-in duration-500">
        <DashboardDataCache data={dashboard} />

        <DashboardHeader
          firstName={dashboard.customer.firstName}
          lastName={dashboard.customer.lastName}
        />

        {/* Mobile: stacked, Tablet/Desktop: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          <div className="md:col-span-12 lg:col-span-12">
            <LoyaltyProgressCard
              currentStamps={dashboard.loyalty.currentStamps}
              targetStamps={dashboard.loyalty.targetStamps}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="md:col-span-12 lg:col-span-8">
            <h3 className="text-lg font-semibold tracking-tight mb-4">
              Quick Actions
            </h3>
            <QuickActions />
          </div>
          <div className="md:col-span-12 lg:col-span-4">
            <RecentActivityCard purchases={dashboard.recentPurchases} />
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
