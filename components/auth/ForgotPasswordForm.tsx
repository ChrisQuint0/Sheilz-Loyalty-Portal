"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

import {
  forgotPasswordSchema,
  ForgotPasswordInput,
} from "@/lib/validations/auth";
import { forgotPasswordAction } from "@/app/actions/auth";
import { FormField } from "./FormField";
import { Button } from "@/components/ui/button";

export function ForgotPasswordForm() {
  const [serverMessage, setServerMessage] = React.useState<string | null>(null);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const methods = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: ForgotPasswordInput) {
    setServerError(null);
    setServerMessage(null);

    const formData = new FormData();
    formData.set("email", data.email);

    startTransition(async () => {
      const result = await forgotPasswordAction(undefined, formData);
      if (!result) return;
      if (result.ok) {
        setServerMessage(
          result.message ?? "Check your email for a reset link.",
        );
        return;
      }
      setServerError(result.message ?? "We couldn't process your request.");
    });
  }

  const isLoading = isPending || methods.formState.isSubmitting;

  if (serverMessage) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <svg
            className="h-6 w-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Check your email</h3>
        <p className="text-sm text-muted-foreground">{serverMessage}</p>
        <Button variant="outline" className="mt-4 w-full" asChild>
          <Link href="/login">Return to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="email"
          label="Email address"
          type="email"
          placeholder="name@example.com"
          disabled={isLoading}
        />

        {serverError && (
          <p role="alert" className="text-sm font-medium text-destructive">
            {serverError}
          </p>
        )}

        <Button
          type="submit"
          className="w-full mt-2"
          disabled={isLoading}
          size="lg"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Reset Link
        </Button>

        <div className="mt-4 text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
