import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import QRCode from "react-qr-code";

export default function CardPage() {
  return (
    <AppLayout>
      <PageContainer className="flex flex-col items-center">
        <PageHeader 
          title="Digital Card" 
          description="Show this QR code at the register to earn points." 
          className="text-center w-full"
        />
        
        <SectionCard className="w-full max-w-sm p-8 flex flex-col items-center justify-center mt-4">
          <div className="bg-white p-4 rounded-xl shadow-inner mb-6">
            {/* Using a placeholder value for the QR code */}
            <QRCode value="sheilz-user-12345" size={200} />
          </div>
          <h3 className="text-xl font-bold tracking-tight">John Doe</h3>
          <p className="text-muted-foreground mt-1">Member since 2026</p>
        </SectionCard>
      </PageContainer>
    </AppLayout>
  );
}
