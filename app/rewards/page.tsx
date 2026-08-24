import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { Coffee, Cookie } from "lucide-react";
import { requireUser } from "@/lib/auth";

export default async function RewardsPage() {
  await requireUser();

  return (
    <AppLayout>
      <PageContainer>
        <PageHeader
          title="Rewards"
          description="Redeem your points for delicious treats."
        />

        <div className="mb-6 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium flex justify-between items-center">
          <span>Your Points Balance</span>
          <span className="text-xl font-bold">450</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SectionCard className="p-4 flex flex-col justify-between h-full">
            <div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Coffee className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Free Americano</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Get a free regular size Americano.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="font-bold text-primary">300 pts</span>
              <Button size="sm">Redeem</Button>
            </div>
          </SectionCard>

          <SectionCard className="p-4 flex flex-col justify-between h-full opacity-70">
            <div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Butter Croissant</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Freshly baked butter croissant.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="font-bold text-primary">500 pts</span>
              <Button size="sm" variant="secondary" disabled>
                Need 50 pts
              </Button>
            </div>
          </SectionCard>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
