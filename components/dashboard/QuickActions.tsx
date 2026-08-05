import { QuickActionButton } from "./QuickActionButton"
import { QrCode, Clock } from "lucide-react"

export function QuickActions() {
  const actions = [
    { icon: QrCode, label: "Show Card", href: "/card" },
    { icon: Clock, label: "Purchase History", href: "/history" },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action) => (
        <QuickActionButton
          key={action.href}
          icon={action.icon}
          label={action.label}
          href={action.href}
        />
      ))}
    </div>
  )
}
