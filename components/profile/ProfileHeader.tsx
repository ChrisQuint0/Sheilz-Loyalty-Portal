import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export function ProfileHeader() {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Link 
        href="/dashboard"
        className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/50"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Back</span>
      </Link>
      <div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          My Profile
        </h1>
        <p className="text-sm text-muted-foreground">Manage your account information</p>
      </div>
    </div>
  )
}
