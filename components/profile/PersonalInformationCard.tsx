"use client"

import { useState } from "react"
import { SectionCard } from "@/components/common/SectionCard"
import { Button } from "@/components/ui/button"
import { UserProfile } from "@/data/mockProfile"
import { EditProfileDialog } from "./EditProfileDialog"
import { User } from "lucide-react"

interface PersonalInformationCardProps {
  profile: UserProfile
}

export function PersonalInformationCard({ profile }: PersonalInformationCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  return (
    <SectionCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-foreground">
          <User className="h-5 w-5" />
          <h2 className="font-semibold tracking-tight">Personal Information</h2>
        </div>
        <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
          Edit Information
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b last:border-0 gap-1">
          <span className="text-sm text-muted-foreground">First Name</span>
          <span className="text-sm font-medium">{profile.firstName}</span>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b last:border-0 gap-1">
          <span className="text-sm text-muted-foreground">Last Name</span>
          <span className="text-sm font-medium">{profile.lastName}</span>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b last:border-0 gap-1">
          <span className="text-sm text-muted-foreground">Email Address</span>
          <span className="text-sm font-medium">{profile.email}</span>
        </div>

      </div>

      <EditProfileDialog 
        profile={profile} 
        open={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen} 
      />
    </SectionCard>
  )
}
