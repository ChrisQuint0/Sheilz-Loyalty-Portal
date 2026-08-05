"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import { registerSchema, RegisterInput } from "@/lib/validations/auth"
import { FormField } from "./FormField"
import { PasswordField } from "./PasswordField"
import { Button } from "@/components/ui/button"

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: RegisterInput) {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Since it's frontend only, navigate to dashboard
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField 
            name="firstName" 
            label="First Name" 
            placeholder="John" 
            disabled={isLoading}
          />
          <FormField 
            name="lastName" 
            label="Last Name" 
            placeholder="Doe" 
            disabled={isLoading}
          />
        </div>
        
        <FormField 
          name="email" 
          label="Email" 
          type="email" 
          placeholder="name@example.com" 
          disabled={isLoading}
        />

        <FormField 
          name="phone" 
          label="Phone Number (Optional)" 
          type="tel" 
          placeholder="+1 (555) 000-0000" 
          disabled={isLoading}
        />
        
        <PasswordField 
          name="password" 
          label="Password" 
          placeholder="Create a password" 
          disabled={isLoading}
        />

        <PasswordField 
          name="confirmPassword" 
          label="Confirm Password" 
          placeholder="Confirm your password" 
          disabled={isLoading}
        />


        <Button type="submit" className="w-full mt-2" disabled={isLoading} size="lg">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Register
        </Button>
      </form>
    </FormProvider>
  )
}
