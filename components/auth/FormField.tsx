import * as React from "react"
import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input, InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface FormFieldProps extends InputProps {
  name: string
  label: string
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ className, name, label, ...props }, ref) => {
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
        <Input
          id={name}
          className={cn(errorMessage && "border-destructive focus-visible:ring-destructive")}
          aria-invalid={!!error}
          aria-describedby={errorMessage ? `${name}-error` : undefined}
          {...props}
          {...register(name)}
        />
        {errorMessage && (
          <p id={`${name}-error`} className="text-[0.8rem] font-medium text-destructive">
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)
FormField.displayName = "FormField"
