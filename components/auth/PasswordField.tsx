"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input, InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface PasswordFieldProps extends Omit<InputProps, "type"> {
  name: string
  label: string
}

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ className, name, label, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const {
      register,
      formState: { errors },
    } = useFormContext()
    
    const error = errors[name]
    const errorMessage = error?.message as string | undefined

    return (
      <div className={cn("space-y-2", className)}>
        <Label htmlFor={name} className={errorMessage ? "text-destructive" : ""}>
          {label}
        </Label>
        <div className="relative">
          <Input
            id={name}
            type={showPassword ? "text" : "password"}
            className={cn(
              "pr-10", 
              errorMessage && "border-destructive focus-visible:ring-destructive"
            )}
            aria-invalid={!!error}
            aria-describedby={errorMessage ? `${name}-error` : undefined}
            {...props}
            {...register(name)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
            tabIndex={-1} // prevent tab targeting for better UX in forms usually
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
          </button>
        </div>
        {errorMessage && (
          <p id={`${name}-error`} className="text-[0.8rem] font-medium text-destructive">
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)
PasswordField.displayName = "PasswordField"
