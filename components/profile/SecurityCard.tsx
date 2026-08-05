"use client"

import { useState } from "react"
import { SectionCard } from "@/components/common/SectionCard"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { ChangePasswordDialog } from "./ChangePasswordDialog"

export function SecurityCard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SectionCard className="p-6">
      <div className="flex items-center gap-2 mb-6 text-foreground">
        <Shield className="h-5 w-5" />
        <h2 className="font-semibold tracking-tight">Security</h2>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Password</p>
          <p className="text-sm text-muted-foreground">Change your password to keep your account secure.</p>
        </div>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Change Password
        </Button>
      </div>

      <ChangePasswordDialog open={isOpen} onOpenChange={setIsOpen} />
    </SectionCard>
  )
}
