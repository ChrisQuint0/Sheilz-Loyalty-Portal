import { Sun, CloudSun, Moon } from "lucide-react"
import { AvatarPlaceholder } from "@/components/common/AvatarPlaceholder"

interface DashboardHeaderProps {
  firstName: string
  lastName: string
}

export function DashboardHeader({ firstName, lastName }: DashboardHeaderProps) {
  const hour = new Date().getHours()
  
  const getGreeting = () => {
    if (hour < 12) return { text: "Good Morning", Icon: Sun }
    if (hour < 18) return { text: "Good Afternoon", Icon: CloudSun }
    return { text: "Good Evening", Icon: Moon }
  }

  const { text, Icon } = getGreeting()

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <p className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
          {text} <Icon className="h-5 w-5 text-primary" />
        </p>
        <p className="text-sm text-muted-foreground">
          {firstName} {lastName}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <AvatarPlaceholder fallback={`${firstName[0]}${lastName[0]}`} size="md" />
      </div>
    </div>
  )
}
