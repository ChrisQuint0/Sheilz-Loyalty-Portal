"use client"

import { Sidebar } from "./Sidebar"
import { BottomNavigation } from "./BottomNavigation"
import { MobileHeader } from "./MobileHeader"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col pb-16 lg:pb-0">
        <MobileHeader />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <BottomNavigation />
      </div>
    </div>
  )
}
