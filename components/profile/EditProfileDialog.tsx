"use client"

import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useTransition } from "react"

import { editProfileSchema, EditProfileInput } from "@/lib/validations/profile"
import { UserProfile } from "@/data/mockProfile"
import { updateProfileAction, updatePasswordAction } from "@/app/actions/auth"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/auth/FormField"
import { PasswordField } from "@/components/auth/PasswordField"

interface EditProfileDialogProps {
  profile: UserProfile
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditProfileDialog({ profile, open, onOpenChange }: EditProfileDialogProps) {
  const [isPending, startTransition] = useTransition()

  const methods = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data: EditProfileInput) => {
    startTransition(async () => {
      const profileFormData = new FormData()
      profileFormData.set("firstName", data.firstName)
      profileFormData.set("lastName", data.lastName)

      const profileResult = await updateProfileAction(undefined, profileFormData)
      if (!profileResult.ok) {
        toast.error(profileResult.message ?? "Could not update your profile.")
        return
      }

      if (data.password && data.password.trim().length > 0) {
        const passwordFormData = new FormData()
        passwordFormData.set("password", data.password)
        passwordFormData.set("confirmPassword", data.confirmPassword ?? "")

        const passwordResult = await updatePasswordAction(undefined, passwordFormData)
        if (!passwordResult.ok) {
          toast.error(passwordResult.message ?? "Could not update your password.")
          return
        }
      }

      toast.success(
        data.password && data.password.trim().length > 0
          ? "Profile and password updated successfully."
          : "Profile updated successfully.",
      )
      onOpenChange(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Information</DialogTitle>
          <DialogDescription>
            Update your personal details below. Email cannot be changed.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField name="firstName" label="First Name" disabled={isPending} />
              <FormField name="lastName" label="Last Name" disabled={isPending} />
            </div>

            <div className="space-y-2 opacity-70">
              <label className="text-sm font-medium leading-none">Email Address</label>
              <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground">
                {profile.email}
              </div>
            </div>

            <div className="space-y-3 rounded-md border border-input bg-muted/30 p-3">
              <p className="text-sm font-medium">Password</p>
              <PasswordField name="password" label="New Password" disabled={isPending} />
              <PasswordField name="confirmPassword" label="Confirm New Password" disabled={isPending} />
            </div>

            <DialogFooter className="mt-6 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
