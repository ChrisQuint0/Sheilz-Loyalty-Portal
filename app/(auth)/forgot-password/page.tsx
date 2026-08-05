import { Metadata } from "next"
import { AuthCard } from "@/components/auth/AuthCard"
import { AuthHeader } from "@/components/auth/AuthHeader"
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"

export const metadata: Metadata = {
  title: "Forgot Password | Sheilz Loyalty Portal",
  description: "Reset your password",
}

export default function ForgotPasswordPage() {
  return (
    <AuthCard>
      <AuthHeader 
        title="Reset Password" 
        description="Enter your email address and we'll send you a link to reset your password." 
      />
      
      <ForgotPasswordForm />
    </AuthCard>
  )
}
