import { useState } from "react";

export const DateRangePicker: React.FC<{
  label: string;
  onChange: (range: string) => void;
}> = ({ label, onChange }) => {
  const [range, setRange] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRange(value);
    // Validate format (e.g., DD/MM/YYYY-DD/MM/YYYY)
    const regex = /^\d{2}\/\d{2}\/\d{4}-\d{2}\/\d{2}\/\d{4}$/;
    if (regex.test(value)) {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="text"
        placeholder="DD/MM/YYYY-DD/MM/YYYY"
        value={range}
        onChange={handleChange}
        className="rounded border p-2 text-sm"
      />
    </div>
  );
};
