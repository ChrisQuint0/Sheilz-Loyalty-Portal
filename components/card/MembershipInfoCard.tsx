import { SectionCard } from "@/components/common/SectionCard"

interface MembershipInfoCardProps {
  memberSince: string
  status: string
  totalPurchases: number
  isCardMissing?: boolean
}

export function MembershipInfoCard({ memberSince, status, totalPurchases, isCardMissing = false }: MembershipInfoCardProps) {
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
          <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${status === 'Active' ? 'text-green-600 bg-green-50' : 'text-amber-700 bg-amber-50'}`}>
            {status}
          </span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b last:border-0">
          <span className="text-sm text-muted-foreground">Total Purchases</span>
          <span className="text-sm font-medium">{totalPurchases}</span>
        </div>

        {isCardMissing && (
          <div className="pt-2">
            <p className="text-sm text-muted-foreground mb-2">No loyalty card found — ask staff to link your card or request one in-store.</p>
            <div className="flex gap-3">
              <button className="px-3 py-2 rounded-md bg-primary text-primary-foreground">Request card</button>
              <button className="px-3 py-2 rounded-md border">Link card</button>
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  )
}
