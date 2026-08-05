import { Metadata } from "next"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageContainer } from "@/components/layout/PageContainer"
import { ProfileHeader } from "@/components/profile/ProfileHeader"
import { ProfileSummaryCard } from "@/components/profile/ProfileSummaryCard"
import { PersonalInformationCard } from "@/components/profile/PersonalInformationCard"
import { SecurityCard } from "@/components/profile/SecurityCard"
import { ApplicationInfoCard } from "@/components/profile/ApplicationInfoCard"
import { LogoutCard } from "@/components/profile/LogoutCard"

import { mockProfile } from "@/data/mockProfile"

export const metadata: Metadata = {
  title: "My Profile | Sheilz Loyalty Portal",
  description: "Manage your Sheilz Coffee account settings",
}

export default function ProfilePage() {
  return (
    <AppLayout>
      <PageContainer className="max-w-2xl mx-auto pb-24 lg:pb-12">
        <ProfileHeader />

        <div className="space-y-6">
          <ProfileSummaryCard 
            firstName={mockProfile.firstName}
            lastName={mockProfile.lastName}
            email={mockProfile.email}
            status={mockProfile.membershipStatus}
          />

          <PersonalInformationCard profile={mockProfile} />

          <SecurityCard />

          <ApplicationInfoCard 
            memberSince={mockProfile.memberSince}
            cardNumber={mockProfile.cardNumber}
          />

          <div className="pt-6">
            <LogoutCard />
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  )
}
