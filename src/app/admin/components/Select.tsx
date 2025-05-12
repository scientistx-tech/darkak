import { cn } from "@/lib/utils";
import React from "react";

type Option = {
  value: string;
  label: string;
};

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  required?: boolean;
  options: Option[];
  className?: string;
};

function Select({ label, required, options, className, ...props }: Props) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Label */}
      {label && (
        <label className="text-md flex items-center gap-1 font-medium">
          {label}
          {required && <span className="text-red-600">*</span>}
        </label>
      )}

      {/* Select Field */}
      <select
        className="input input-bordered flex h-[50px] w-full rounded-md bg-slate-100 dark:bg-dark-2 px-3 outline-none"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      
    </div>
  );
}

export default Select;
