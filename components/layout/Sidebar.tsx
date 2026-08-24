import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, QrCode, User, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DashboardSnapshot } from "@/lib/dashboard-data"
import Image from "next/image"
import { AvatarPlaceholder } from "../common/AvatarPlaceholder"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Card", href: "/card", icon: QrCode },
  { name: "History", href: "/history", icon: Clock },
  { name: "Profile", href: "/profile", icon: User },
]

const fallbackProfile = {
  firstName: "Customer",
  lastName: "",
  points: 0,
}

export function Sidebar() {
  const pathname = usePathname()
  const profile = (() => {
    if (typeof window === "undefined") return fallbackProfile

    try {
      const raw = sessionStorage.getItem("sheilz-dashboard-cache")
      if (!raw) return fallbackProfile

      const data = JSON.parse(raw) as DashboardSnapshot
      const firstName = data.customer?.firstName ?? fallbackProfile.firstName
      const lastName = data.customer?.lastName ?? ""
      const points = Number(data.loyalty?.currentStamps ?? fallbackProfile.points)

      return {
        firstName,
        lastName,
        points: Number.isFinite(points) ? points : fallbackProfile.points,
      }
    } catch {
      return fallbackProfile
    }
  })()

  const fullName = `${profile.firstName} ${profile.lastName}`.trim() || "Customer"
  const initials = `${profile.firstName?.[0] ?? "C"}${profile.lastName?.[0] ?? ""}`.trim() || "C"

  return (
    <aside className="hidden w-64 flex-col border-r bg-sidebar lg:flex h-screen sticky top-0">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-3 font-semibold text-sidebar-foreground">
          <Image src="/logo.png" alt="Sheilz Coffee" width={28} height={28} className="object-contain" />
          <span>Sheilz Loyalty</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-md px-3 py-2">
          <AvatarPlaceholder fallback={initials} size="sm" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">{fullName}</span>
            <span className="text-xs text-muted-foreground">{profile.points} Points</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
