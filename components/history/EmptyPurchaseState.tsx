import { EmptyState } from "@/components/common/EmptyState"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function EmptyPurchaseState() {
  return (
    <EmptyState
      title="No Purchases Yet"
      description="Start earning loyalty stamps by purchasing your favorite drinks at Sheilz Coffee."
      className="py-12"
      action={
        <Button asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      }
    />
  )
}
