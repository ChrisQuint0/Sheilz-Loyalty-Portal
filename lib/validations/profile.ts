import * as z from "zod"

export const editProfileSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    password: z.string().optional().or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      const password = data.password ?? ""
      const hasPassword = password.trim().length > 0
      if (!hasPassword) return true
      return password.length >= 8 && password === (data.confirmPassword ?? "")
    },
    {
      message: "Password must be at least 8 characters and match confirmation.",
      path: ["confirmPassword"],
    },
  )

export type EditProfileInput = z.infer<typeof editProfileSchema>

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
