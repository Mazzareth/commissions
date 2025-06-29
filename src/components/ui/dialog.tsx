"use client";

import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import clsx from "clsx";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogPortal = RadixDialog.Portal;
export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(({ className, ...props }, ref) => (
  <RadixDialog.Overlay
    ref={ref}
    className={clsx(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-fadeIn",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = RadixDialog.Overlay.displayName;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <RadixDialog.Content
      ref={ref}
      className={clsx(
        "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-card text-card-foreground rounded-xl shadow-lg p-6 focus:outline-none animate-fadeIn",
        className
      )}
      {...props}
    >
      {children}
      <RadixDialog.Close asChild>
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </RadixDialog.Close>
    </RadixDialog.Content>
  </DialogPortal>
));
DialogContent.displayName = RadixDialog.Content.displayName;

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);

export const DialogTitle = RadixDialog.Title;
export const DialogDescription = RadixDialog.Description;