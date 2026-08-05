import { SectionCard } from "@/components/common/SectionCard"
import { AvatarInitials } from "./AvatarInitials"
import { Check } from "lucide-react"

interface ProfileSummaryCardProps {
  firstName: string
  lastName: string
  email: string
  status: string
}

export function ProfileSummaryCard({ firstName, lastName, email, status }: ProfileSummaryCardProps) {
  return (
    <SectionCard className="p-6 flex flex-col items-center text-center animate-in slide-in-from-bottom-4 duration-500">
      <AvatarInitials firstName={firstName} lastName={lastName} className="mb-4 shadow-sm" />
      
      <h2 className="text-xl font-bold text-foreground">
        {firstName} {lastName}
      </h2>
      
      <p className="text-sm text-muted-foreground mt-1 mb-4">
        {email}
      </p>
      
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
        <Check className="h-3.5 w-3.5" />
        <span>{status} Member</span>
      </div>
    </SectionCard>
  )
}
