import { cn } from "@/lib/utils";
import React, { ElementType, ReactNode } from "react";

interface SubheadingProps {
  className?: string;
  as?: ElementType;
  children: ReactNode;
  [key: string]: any; // Allow other props
}

export const Subheading = ({
  className,
  as: Tag = "h2",
  children,
  ...props
}: SubheadingProps) => {
  return (
    <Tag
      className={cn(
        "text-sm md:text-base max-w-4xl text-left my-4 mx-auto",
        "text-muted text-center font-normal",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};