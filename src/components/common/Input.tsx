import React from "react";
import { Input as ShadInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  rightIcon?: React.ReactNode;
}

const Input = ({ error, rightIcon, className, ...props }: CommonInputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="relative w-full">
        <ShadInput
          className={cn(
            "h-11 rounded-2xl bg-gray-g1-5 border-none pr-10 px-4",
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-g6 cursor-pointer">
            {rightIcon}
          </div>
        )}
      </div>

      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default Input;
