import { Metadata } from "next";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { CardHeader } from "@/components/card/CardHeader";
import { CardDataLoader } from "@/components/card/CardDataLoader";

import { requireUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "My Digital Card | Sheilz Loyalty Portal",
  description: "View your Sheilz Coffee digital loyalty card and progress",
};

export default async function CardPage() {
  await requireUser();

  return (
    <AppLayout>
      <PageContainer className="max-w-2xl mx-auto pb-24 lg:pb-8">
        <CardHeader />
        <CardDataLoader />
      </PageContainer>
    </AppLayout>
  );
}
