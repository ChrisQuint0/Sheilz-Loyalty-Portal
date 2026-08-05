import { Metadata } from "next"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageContainer } from "@/components/layout/PageContainer"
import { CardHeader } from "@/components/card/CardHeader"
import { DigitalCard } from "@/components/card/DigitalCard"
import { LoyaltyProgressCard } from "@/components/card/LoyaltyProgressCard"
import { MembershipInfoCard } from "@/components/card/MembershipInfoCard"

import { mockCard } from "@/data/mockCard"

export const metadata: Metadata = {
  title: "My Digital Card | Sheilz Loyalty Portal",
  description: "View your Sheilz Coffee digital loyalty card and progress",
}

export default function CardPage() {
  return (
    <AppLayout>
      <PageContainer className="max-w-2xl mx-auto pb-24 lg:pb-8">
        <CardHeader />
        
        <div className="space-y-8 animate-in fade-in duration-500 delay-75">
          <DigitalCard 
            customerName={mockCard.customerName}
            cardNumber={mockCard.cardNumber}
            memberSince={mockCard.memberSince}
            qrValue={mockCard.qrValue}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <LoyaltyProgressCard 
                currentStamps={mockCard.currentStamps}
                targetStamps={mockCard.targetStamps}
              />
            </div>
            
            <div className="md:col-span-2">
              <MembershipInfoCard 
                memberSince={mockCard.memberSince}
                status={mockCard.status}
                totalPurchases={mockCard.totalPurchases}
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  )
}
