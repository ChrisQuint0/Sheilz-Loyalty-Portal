import { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { FormDivider } from "@/components/auth/FormDivider";
import { LoginForm } from "@/components/auth/LoginForm";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Button } from "@/components/ui/button";
import { redirectIfAuthenticated } from "@/lib/auth";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | Sheilz Loyalty Portal",
  description: "Sign in to access your loyalty account",
};

type LoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const recoveryParam = params?.recovery
  const verificationParam = params?.verification
  const emailParam = params?.email

  const isRecoveryFlow = Array.isArray(recoveryParam)
    ? recoveryParam.some((value) => value === "1" || value === "true")
    : recoveryParam === "1" || recoveryParam === "true" || recoveryParam === "yes"

  const showVerificationNotice = Array.isArray(verificationParam)
    ? verificationParam.some((value) => value === "sent")
    : verificationParam === "sent"

  const emailAddress = Array.isArray(emailParam)
    ? emailParam.find((value) => Boolean(value)) ?? ""
    : emailParam ?? ""

  // If the recovery query param is present, don't redirect away — the
  // recovery flow creates a short-lived recovery session needed to set the
  // new password. Otherwise, redirect already-authenticated users.
  if (!isRecoveryFlow) {
    await redirectIfAuthenticated();
  }

  const showRecovery = isRecoveryFlow

  return (
    <AuthCard>
      <AuthHeader
        title={showRecovery ? "Set a new password" : "Welcome Back"}
        description={showRecovery ? "Enter a new password to finish resetting your account." : "Sign in to access your loyalty account"}
      />

      {!showRecovery && showVerificationNotice && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"
        >
          We sent a verification email to <span className="font-medium">{emailAddress || "your email"}</span>. Please check your inbox and verify your email before signing in.
        </div>
      )}

      {showRecovery ? <ResetPasswordForm /> : <LoginForm />}

      {!showRecovery && <>
        <FormDivider />

        <Button variant="outline" className="w-full" asChild>
          <Link href="/register">Create an account</Link>
        </Button>

        <AuthFooter
          text="Don't have an account?"
          linkText="Register"
          href="/register"
        />
      </>}
    </AuthCard>
  );
}
