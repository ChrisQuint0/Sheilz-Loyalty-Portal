import { Metadata } from "next"
import { AuthCard } from "@/components/auth/AuthCard"
import { AuthHeader } from "@/components/auth/AuthHeader"
import { AuthFooter } from "@/components/auth/AuthFooter"
import { FormDivider } from "@/components/auth/FormDivider"
import { RegisterForm } from "@/components/auth/RegisterForm"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Register | Sheilz Loyalty Portal",
  description: "Create an account to start earning rewards",
}

export default function RegisterPage() {
  return (
    <AuthCard>
      <AuthHeader 
        title="Create an Account" 
        description="Join the Sheilz Loyalty program and start earning rewards today" 
      />
      
      <RegisterForm />
      
      <FormDivider text="or" />
      
      <Button variant="outline" className="w-full" asChild>
        <Link href="/login">Sign in with existing account</Link>
      </Button>

      <AuthFooter 
        text="Already have an account?" 
        linkText="Login" 
        href="/login" 
      />
    </AuthCard>
  )
}
