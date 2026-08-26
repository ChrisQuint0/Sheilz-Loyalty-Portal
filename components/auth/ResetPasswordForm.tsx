"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { resetPasswordSchema, ResetPasswordInput } from "@/lib/validations/auth";
import { updatePasswordAction } from "@/app/actions/auth";
import { FormField } from "./FormField";
import { PasswordField } from "./PasswordField";
import { Button } from "@/components/ui/button";

export function ResetPasswordForm() {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const methods = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: ResetPasswordInput) {
    setServerError(null);

    const formData = new FormData();
    formData.set("password", data.password);
    formData.set("confirmPassword", data.confirmPassword);

    startTransition(async () => {
      const result = await updatePasswordAction(undefined, formData);
      // Success path redirects from the server action to /login — if we get
      // a result here it's an error or a non-redirect response.
      if (result?.ok && result.message) {
        toast.success(result.message);
        return;
      }

      if (result && !result.ok) {
        setServerError(result.message ?? "Could not update your password.");
      }
    });
  }

  const isLoading = isPending || methods.formState.isSubmitting;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <PasswordField
          name="password"
          label="New Password"
          placeholder="Create a new password"
          disabled={isLoading}
        />

        <PasswordField
          name="confirmPassword"
          label="Confirm New Password"
          placeholder="Confirm your password"
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
          Update Password
        </Button>
      </form>
    </FormProvider>
  );
}
