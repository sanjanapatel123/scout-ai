import React from "react";
import { Toaster as Sonner } from "sonner";

import { cn } from "@/lib/utils";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ className, ...props }: ToasterProps) => {
  return (
    <Sonner
      className={cn("toaster group", className)}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-scout-text group-[.toaster]:border-scout-border group-[.toaster]:shadow",
          description: "group-[.toast]:text-scout-text-secondary",
          actionButton:
            "group-[.toast]:bg-scout-primary group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-scout-bg group-[.toast]:text-scout-text",
          success: "group-[.toast]:border-scout-success/30",
          error: "group-[.toast]:border-scout-error/30",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
