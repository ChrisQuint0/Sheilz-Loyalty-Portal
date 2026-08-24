"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions/auth";

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LogoutDialog({ open, onOpenChange }: LogoutDialogProps) {
  const [isPending, startTransition] = React.useTransition();

  const handleLogout = () => {
    // logoutAction calls redirect("/login") — that throws NEXT_REDIRECT,
    // which we intentionally let propagate.
    startTransition(() => {
      void logoutAction();
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-destructive">Logout?</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out of your account? You will need to
            sign back in to access your digital loyalty card.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 pt-4 flex sm:justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleLogout}
            disabled={isPending}
          >
            {isPending ? "Signing out…" : "Logout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
