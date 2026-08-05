import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { SectionCard } from "@/components/common/SectionCard";
import { Coffee, Star, Gift } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <AppLayout>
      <PageContainer>
        <PageHeader 
          title="Hello, John!" 
          description="Welcome back to Sheilz Loyalty." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <StatCard 
            title="Current Balance" 
            value="450" 
            description="Points"
            icon={<Star className="h-5 w-5" />}
            className="bg-primary text-primary-foreground border-none [&_h3]:text-primary-foreground/80 [&_span.text-muted-foreground]:text-primary-foreground/80"
          />
          <StatCard 
            title="Rewards Available" 
            value="2" 
            description="Redeemable items"
            icon={<Gift className="h-5 w-5" />}
          />
        </div>

        <h2 className="text-xl font-semibold tracking-tight mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SectionCard className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Coffee className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">My Card</h3>
                <p className="text-sm text-muted-foreground">Show QR at register</p>
              </div>
            </div>
            <Link href="/card">
              <Button variant="outline">View</Button>
            </Link>
          </SectionCard>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
