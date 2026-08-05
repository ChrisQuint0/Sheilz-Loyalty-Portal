import Link from "next/link"
import Image from "next/image"

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b bg-background px-4 lg:hidden">
      <Link href="/dashboard" className="flex items-center gap-3 font-semibold text-foreground">
        <Image src="/logo.png" alt="Sheilz Coffee" width={24} height={24} className="object-contain" />
        <span>Sheilz Coffee</span>
      </Link>
    </header>
  )
}
