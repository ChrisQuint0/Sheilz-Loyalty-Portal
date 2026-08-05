import { Metadata } from "next"
import { AuthCard } from "@/components/auth/AuthCard"
import { AuthHeader } from "@/components/auth/AuthHeader"
import { AuthFooter } from "@/components/auth/AuthFooter"
import { FormDivider } from "@/components/auth/FormDivider"
import { LoginForm } from "@/components/auth/LoginForm"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Login | Sheilz Loyalty Portal",
  description: "Sign in to access your loyalty account",
}

export default function LoginPage() {
  return (
    <AuthCard>
      <AuthHeader 
        title="Welcome Back" 
        description="Sign in to access your loyalty account" 
      />
      
      <LoginForm />
      
      <FormDivider />
      
      <Button variant="outline" className="w-full" asChild>
        <Link href="/register">Create an account</Link>
      </Button>
      
      <AuthFooter 
        text="Don't have an account?" 
        linkText="Register" 
        href="/register" 
      />
    </AuthCard>
  )
}
