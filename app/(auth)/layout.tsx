import { Coffee } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="absolute top-0 w-full p-4 md:p-6 lg:p-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <Coffee className="h-6 w-6 text-primary" />
          <span className="text-lg">Sheilz Loyalty</span>
        </Link>
      </header>
      
      <main className="flex flex-1 flex-col items-center justify-center p-4 py-24 sm:p-8">
        {children}
      </main>
    </div>
  )
}
