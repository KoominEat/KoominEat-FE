"use client";

import { cn } from "@/lib/utils";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "disabled";
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  className,
  variant = "primary",
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={cn(
        "w-full py-3.5 text-white rounded-xl font-semibold transition active:scale-[0.98] cursor-pointer",
        {
          // ✨ Variant 스타일
          "bg-main text-white hover:bg-main/90": variant === "primary",
          "bg-white text-main hover:bg-main/30 outline outline-1 outline-main":
            variant === "ghost",
          "bg-gray-g4 cursor-not-allowed": variant === "disabled",
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
