import { AppLayout } from "@/components/layout/AppLayout"
import { PageContainer } from "@/components/layout/PageContainer"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { LoyaltyProgressCard } from "@/components/dashboard/LoyaltyProgressCard"
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard"
import { QuickActions } from "@/components/dashboard/QuickActions"

import { mockDashboard } from "@/data/mockDashboard"

export default function DashboardPage() {
  const { customer, loyalty, recentPurchases } = mockDashboard

  return (
    <AppLayout>
      <PageContainer className="animate-in fade-in duration-500">
        <DashboardHeader firstName={customer.firstName} lastName={customer.lastName} />
        
        {/* Mobile: stacked, Tablet/Desktop: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          <div className="md:col-span-12 lg:col-span-12">
            <LoyaltyProgressCard 
              currentStamps={loyalty.currentStamps}
              targetStamps={loyalty.targetStamps}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="md:col-span-12 lg:col-span-8">
            <h3 className="text-lg font-semibold tracking-tight mb-4">Quick Actions</h3>
            <QuickActions />
          </div>
          <div className="md:col-span-12 lg:col-span-4">
            <RecentActivityCard purchases={recentPurchases} />
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  )
}
