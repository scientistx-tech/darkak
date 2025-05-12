import { cn } from "@/lib/utils";
import React, { useState } from "react";

type Props = {
  label?: string;
  Icon?: React.ReactNode;
  required?: boolean;
  className?: string;
  error?: string | undefined;
  value: string[];
  onChange: (value: string[]) => void;
};

function Keywords({
  label,
  Icon,
  required,
  className,
  error,
  value,
  onChange,
}: Props) {
  const [inputValue, setInputValue] = useState("");

  // Handle adding keywords when comma or enter is pressed
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputValue(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      const newKeyword = inputValue.trim();
      if (!value.includes(newKeyword)) {
        onChange([...value, newKeyword]);
      }
      setInputValue("");
    }
  };

  // Remove a keyword from the list
  const handleRemoveKeyword = (keyword: string) => {
    onChange(value.filter((k) => k !== keyword));
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Label */}
      {label && (
        <label className="text-md flex items-center gap-1 font-medium">
          {label}
          {required && <span className="text-red-600">*</span>}
        </label>
      )}

      {/* Keywords input */}
      <div className="input input-bordered flex h-[50px] w-full items-center gap-2 rounded-md bg-slate-100 dark:bg-dark-2 px-3">
        {/* Display the added keywords as tags */}
        {value.map((keyword, index) => (
          <div
            key={index}
            className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
          >
            {keyword}
            <button
              type="button"
              onClick={() => handleRemoveKeyword(keyword)}
              className="text-blue-600 hover:text-red-500"
            >
              &times;
            </button>
          </div>
        ))}

        {/* Input field for adding new keywords */}
        <input
          className="flex-1 grow bg-transparent outline-none"
          placeholder="Type and press comma or Enter to add keyword"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
}

export default Keywords;
