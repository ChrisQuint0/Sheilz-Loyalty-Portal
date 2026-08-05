import { SectionCard } from "@/components/common/SectionCard"
import { Purchase } from "@/data/mockDashboard"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

interface RecentActivityCardProps {
  purchases: Purchase[]
}

export function RecentActivityCard({ purchases }: RecentActivityCardProps) {
  return (
    <SectionCard className="flex flex-col h-full">
      <div className="p-6 pb-4 border-b">
        <h2 className="font-semibold text-lg tracking-tight">Recent Purchases</h2>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-center">
        {purchases.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <p className="text-sm">No recent activity.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {purchases.map((purchase, index) => (
              <div key={purchase.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{purchase.drink}</p>
                    <p className="text-xs text-muted-foreground mt-1">{purchase.date}</p>
                  </div>
                  {purchase.earnedStamp && (
                    <div className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      <Check className="h-3 w-3" />
                      <span>Stamp Earned</span>
                    </div>
                  )}
                </div>
                {index < purchases.length - 1 && (
                  <hr className="my-4 border-muted" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 pt-0 mt-auto">
        <Link 
          href="/history" 
          className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-primary hover:bg-muted/50 rounded-lg transition-colors"
        >
          View Full History
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SectionCard>
  )
}
