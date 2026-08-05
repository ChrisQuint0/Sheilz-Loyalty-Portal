"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import { loginSchema, LoginInput } from "@/lib/validations/auth"
import { FormField } from "./FormField"
import { PasswordField } from "./PasswordField"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(data: LoginInput) {
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
        <FormField 
          name="email" 
          label="Email" 
          type="email" 
          placeholder="name@example.com" 
          disabled={isLoading}
        />
        
        <div className="space-y-1">
          <PasswordField 
            name="password" 
            label="Password" 
            placeholder="Enter your password" 
            disabled={isLoading}
          />
          <div className="flex items-center justify-end">
            <Link 
              href="/forgot-password" 
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-2 py-2">
          <Checkbox 
            id="rememberMe" 
            disabled={isLoading}
            checked={methods.watch("rememberMe")}
            onCheckedChange={(checked) => methods.setValue("rememberMe", checked as boolean)}
          />
          <Label 
            htmlFor="rememberMe" 
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading} size="lg">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>
    </FormProvider>
  )
}
