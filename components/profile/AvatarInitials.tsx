import { cn } from "@/lib/utils"

interface AvatarInitialsProps {
  firstName: string
  lastName: string
  className?: string
}

export function AvatarInitials({ firstName, lastName, className }: AvatarInitialsProps) {
  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase()

  return (
    <div 
      className={cn(
        "flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary",
        className
      )}
    >
      {initials}
    </div>
  )
}
