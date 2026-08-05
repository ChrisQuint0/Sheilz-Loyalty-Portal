"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, onChange, ...props }, ref) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onCheckedChange?.(e.target.checked)
    }

    return (
      <div className={cn("relative flex items-center justify-center h-5 w-5", className)}>
        <input
          type="checkbox"
          ref={ref}
          className="peer absolute h-full w-full cursor-pointer appearance-none opacity-0"
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <div className="pointer-events-none flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary text-current ring-offset-background peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-checked:bg-primary peer-checked:text-primary-foreground">
          {(checked || props.defaultChecked) && (
            <Check className="h-3 w-3" />
          )}
        </div>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
