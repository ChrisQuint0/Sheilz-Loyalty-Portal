import { Metadata } from "next";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { DashboardDataCache } from "@/components/dashboard/DashboardDataCache";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSummaryCard } from "@/components/profile/ProfileSummaryCard";
import { PersonalInformationCard } from "@/components/profile/PersonalInformationCard";
import { ApplicationInfoCard } from "@/components/profile/ApplicationInfoCard";
import { LogoutCard } from "@/components/profile/LogoutCard";

import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard-data";

export const metadata: Metadata = {
  title: "My Profile | Sheilz Loyalty Portal",
  description: "Manage your Sheilz Coffee account settings",
};

export default async function ProfilePage() {
  const user = await requireUser();
  const dashboard = await getDashboardData(user.email);

  const profile = {
    firstName: dashboard.customer.firstName,
    lastName: dashboard.customer.lastName,
    email: user.email ?? "",
    memberSince: dashboard.card.memberSince,
    cardNumber: dashboard.card.cardNumber,
    membershipStatus: dashboard.card.status,
  };

  return (
    <AppLayout>
      <PageContainer className="max-w-2xl mx-auto pb-24 lg:pb-12">
        <DashboardDataCache data={dashboard} />
        <ProfileHeader />

        <div className="space-y-6">
          <ProfileSummaryCard
            firstName={profile.firstName}
            lastName={profile.lastName}
            email={profile.email}
            status={profile.membershipStatus}
          />

          <PersonalInformationCard profile={profile} />

          <ApplicationInfoCard
            memberSince={profile.memberSince}
            cardNumber={profile.cardNumber}
          />

          <div className="pt-6">
            <LogoutCard />
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
