export const ImageInput: React.FC<{
  label: string;
  onChange: (file: File | null) => void;
  preview: string | null;
  imageRatio: string;
}> = ({ label, onChange, preview, imageRatio }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onChange(file);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <div className="flex flex-col space-y-2">
        {/* Image Preview */}
        <div
          className={`flex items-center justify-center rounded-[10px] border border-dashed border-gray-300 dark:border-gray-600 ${
            imageRatio === "1:1" ? "h-24 w-24" : "h-20 w-80"
          }`}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className={`rounded-[10px] object-cover ${
                imageRatio === "1:1" ? "h-24 w-24" : "h-20 w-80"
              }`}
            />
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              No Image
            </span>
          )}
        </div>
        {/* File Input */}
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <div className="flex items-center justify-between rounded-[10px] border bg-gray-100 p-2 text-sm dark:bg-gray-700">
            <span className="text-black dark:text-white">Choose File</span>
            <span className="text-gray-500 dark:text-gray-400">
              No file chosen
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
