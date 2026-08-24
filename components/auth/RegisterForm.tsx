"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { registerSchema, RegisterInput } from "@/lib/validations/auth";
import { registerAction } from "@/app/actions/auth";
import { FormField } from "./FormField";
import { PasswordField } from "./PasswordField";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

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
  });

  function onSubmit(data: RegisterInput) {
    setServerError(null);

    const formData = new FormData();
    formData.set("firstName", data.firstName);
    formData.set("lastName", data.lastName);
    formData.set("email", data.email);
    formData.set("phone", data.phone ?? "");
    formData.set("password", data.password);
    formData.set("confirmPassword", data.confirmPassword);

    startTransition(async () => {
      const result = await registerAction(undefined, formData);
      // The action calls redirect() on success — reaching here means error
      // or a "check your email" message.
      if (result?.ok && result.message) {
        toast.success(result.message);
        return;
      }
      if (result && !result.ok) {
        setServerError(result.message ?? "Could not create your account.");
      }
    });
  }

  const isLoading = isPending || methods.formState.isSubmitting;

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
          Register
        </Button>
      </form>
    </FormProvider>
  );
}
