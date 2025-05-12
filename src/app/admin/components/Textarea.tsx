import { cn } from "@/lib/utils";
import React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  Icon?: React.ReactNode;
  required?: boolean;
  className?: string;
  error?: string | undefined;
};

const Textarea: React.FC<Props> = ({ label, Icon, required, className, error, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Label */}
      {label && (
        <label className="text-md flex items-center gap-1 font-medium">
          {label}
          {required && <span className="text-red-600">*</span>}
        </label>
      )}

      {/* Textarea Field */}
      <label className="input input-bordered flex  w-full items-start gap-2 rounded-md bg-slate-100 dark:bg-dark-2 px-3 py-2">
        {Icon && <span className="mt-1">{Icon}</span>}
        <textarea
          className="flex-1 min-h-[80px] grow bg-transparent outline-none resize-none"
          {...props}
        />
      </label>

      {/* Error Message */}
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
};

export default Textarea;
