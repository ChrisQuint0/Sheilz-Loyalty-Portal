import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { Clock } from "lucide-react";

export default function HistoryPage() {
  return (
    <AppLayout>
      <PageContainer>
        <PageHeader 
          title="Transaction History" 
          description="View your past orders and points earned." 
        />
        
        <div className="mt-8">
          <EmptyState 
            icon={<Clock className="h-12 w-12" />}
            title="No history yet"
            description="You haven't made any transactions yet. Visit Sheilz Coffee to start earning points!"
          />
        </div>
      </PageContainer>
    </AppLayout>
  );
}
