"use client"

import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { editProfileSchema, EditProfileInput } from "@/lib/validations/profile"
import { UserProfile } from "@/data/mockProfile"
import { toast } from "sonner"

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

interface EditProfileDialogProps {
  profile: UserProfile
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditProfileDialog({ profile, open, onOpenChange }: EditProfileDialogProps) {
  const methods = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
    },
  })

  const onSubmit = (data: EditProfileInput) => {
    console.log("Mock saved profile data:", data)
    toast.success("Profile updated successfully")
    onOpenChange(false)
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
              <FormField name="firstName" label="First Name" />
              <FormField name="lastName" label="Last Name" />
            </div>
            
            {/* Read only email visual */}
            <div className="space-y-2 opacity-70">
              <label className="text-sm font-medium leading-none">Email Address</label>
              <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground">
                {profile.email}
              </div>
            </div>

            <DialogFooter className="mt-6 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
