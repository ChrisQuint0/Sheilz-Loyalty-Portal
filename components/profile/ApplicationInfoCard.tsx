import { SectionCard } from "@/components/common/SectionCard"
import { Smartphone } from "lucide-react"

interface ApplicationInfoCardProps {
  memberSince: string
  cardNumber: string
}

export function ApplicationInfoCard({ memberSince, cardNumber }: ApplicationInfoCardProps) {
  return (
    <SectionCard className="p-6">
      <div className="flex items-center gap-2 mb-6 text-foreground">
        <Smartphone className="h-5 w-5" />
        <h2 className="font-semibold tracking-tight">Membership Information</h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b last:border-0">
          <span className="text-sm text-muted-foreground">Member Since</span>
          <span className="text-sm font-medium">{memberSince}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b last:border-0">
          <span className="text-sm text-muted-foreground">Card Number</span>
          <span className="text-sm font-medium font-mono">{cardNumber}</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-6 text-center">
        Thank you for being part of the Sheilz Coffee Loyalty Program.
      </p>
    </SectionCard>
  )
}
