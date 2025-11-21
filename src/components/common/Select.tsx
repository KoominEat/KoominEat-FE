import React from "react";
import {
  Select as ShadSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OptionType {
  label: string;
  value: string;
}

interface CommonSelectProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options: OptionType[];
  error?: string;
  className?: string;
}

const Select = ({
  placeholder,
  value,
  onValueChange,
  options,
  error,
  className,
}: CommonSelectProps) => {
  return (
    <div className="flex flex-col gap-1 w-full text-gray-g6 ">
      <ShadSelect value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className={`h-11 rounded-2xl bg-white border border-gray-g4 ${className}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="rounded-[20px]">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="rounded-2xl"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadSelect>

      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default Select;
