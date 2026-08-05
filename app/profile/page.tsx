import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { AvatarPlaceholder } from "@/components/common/AvatarPlaceholder";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, LogOut } from "lucide-react";

export default function ProfilePage() {
  return (
    <AppLayout>
      <PageContainer>
        <PageHeader 
          title="Profile" 
          description="Manage your account settings." 
        />
        
        <SectionCard className="p-6 mb-6 flex flex-col sm:flex-row items-center gap-6">
          <AvatarPlaceholder fallback="JD" size="lg" />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-muted-foreground">Loyalty Member</p>
          </div>
          <Button variant="outline" className="sm:ml-auto">Edit Profile</Button>
        </SectionCard>

        <h3 className="font-semibold text-lg mb-3 mt-8">Personal Information</h3>
        <SectionCard className="divide-y">
          <div className="p-4 flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">John Doe</p>
            </div>
          </div>
          <div className="p-4 flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">john@example.com</p>
            </div>
          </div>
          <div className="p-4 flex items-center gap-3">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">Not provided</p>
            </div>
          </div>
        </SectionCard>

        <div className="mt-8 flex justify-center sm:justify-start">
          <Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
