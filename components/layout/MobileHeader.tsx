import { Coffee } from "lucide-react"
import Link from "next/link"

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b bg-background px-4 lg:hidden">
      <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-foreground">
        <Coffee className="h-5 w-5 text-primary" />
        <span>Sheilz Coffee</span>
      </Link>
    </header>
  )
}
