"use client"

import { useState } from "react"
import { SectionCard } from "@/components/common/SectionCard"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { LogoutDialog } from "./LogoutDialog"

export function LogoutCard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SectionCard className="p-6 border-destructive/20 bg-destructive/5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-semibold tracking-tight text-destructive flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            Logout
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Sign out of your Sheilz Loyalty account.</p>
        </div>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Logout
        </Button>
      </div>

      <LogoutDialog open={isOpen} onOpenChange={setIsOpen} />
    </SectionCard>
  )
}
