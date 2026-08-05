import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, QrCode, User, Coffee, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { AvatarPlaceholder } from "../common/AvatarPlaceholder"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Card", href: "/card", icon: QrCode },
  { name: "History", href: "/history", icon: Clock },
  { name: "Profile", href: "/profile", icon: User },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-col border-r bg-sidebar lg:flex h-screen sticky top-0">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-sidebar-foreground">
          <Coffee className="h-6 w-6 text-primary" />
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
          <AvatarPlaceholder fallback="JD" size="sm" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">John Doe</span>
            <span className="text-xs text-muted-foreground">0 Points</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
