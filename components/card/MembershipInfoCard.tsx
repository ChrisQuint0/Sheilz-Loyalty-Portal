import { SectionCard } from "@/components/common/SectionCard"

interface MembershipInfoCardProps {
  memberSince: string
  status: string
  totalPurchases: number
}

export function MembershipInfoCard({ memberSince, status, totalPurchases }: MembershipInfoCardProps) {
  return (
    <SectionCard className="p-6">
      <h2 className="text-lg font-semibold tracking-tight mb-4">Membership Details</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b last:border-0">
          <span className="text-sm text-muted-foreground">Member Since</span>
          <span className="text-sm font-medium">{memberSince}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b last:border-0">
          <span className="text-sm text-muted-foreground">Card Status</span>
          <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            {status}
          </span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b last:border-0">
          <span className="text-sm text-muted-foreground">Total Purchases</span>
          <span className="text-sm font-medium">{totalPurchases}</span>
        </div>
      </div>
    </SectionCard>
  )
}
