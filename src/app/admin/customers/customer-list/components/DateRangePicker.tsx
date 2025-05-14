export const DateRangePicker: React.FC<{
  label: string;
  onChange: (range: string) => void;
  value: string;
  error?: string;
}> = ({ label, onChange, value, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="text"
        placeholder="DD/MM/YYYY-DD/MM/YYYY"
        value={value}
        onChange={handleChange}
        className={`rounded border p-2 text-sm ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
