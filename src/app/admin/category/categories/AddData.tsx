import React, { useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useUploadFormDataMutation } from "@/redux/services/admin/adminCategoryApis";
import { toast } from "react-toastify";
import SelectField from "@/app/(root)/user/profile/components/SelectField";

type AddDataProps = {
  refetch: () => void;
};

function AddData({ refetch }: AddDataProps) {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [selectedCategoryPriority, setSelectedCategoryPriority] =
    useState("Select Priority");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadFormData, { isLoading }] = useUploadFormDataMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!title || !imageFile) {
      toast.error("Please provide both title and image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("icon", imageFile);

    try {
      await uploadFormData(formData).unwrap();
      toast.success("Category created successfully!");
      refetch();
      setTitle("");
      setImageFile(null);
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error("Failed to create category.");
    }
  };
  const handlePriorityChange = (value: string) => {
    setSelectedCategoryPriority(value);
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="text-xl font-semibold">Add Category</div>

      {/* language tabs */}
      <div className="my-5 flex items-center gap-x-5">
        <div
          className={`${currentLanguage === "en" ? "border-b-2 border-blue-500 text-blue-500" : ""} flex cursor-pointer py-2 text-sm font-medium tracking-wider`}
          onClick={() => setCurrentLanguage("en")}
        >
          <button>English (EN)</button>
        </div>
        <div
          className={`${currentLanguage === "bn" ? "border-b-2 border-blue-500 text-blue-500" : ""} cursor-pointer py-2 text-sm font-medium tracking-wider`}
          onClick={() => setCurrentLanguage("bn")}
        >
          <button>Bengali (BD)</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          placeholder={`Category Name (${currentLanguage === "en" ? "EN" : "BD"})`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <SelectField
          // label="Marital Status"
          value={selectedCategoryPriority}
          onChange={(value: string) => handlePriorityChange(value)}
          options={[
            { label: "Set Priority", value: "" },
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
            { label: "6", value: "6" },
            { label: "7", value: "7" },
            { label: "8", value: "8" },
            { label: "9", value: "9" },
            { label: "10", value: "10" },
          ]}
        />
      </div>
      <div
        className="mt-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        }}
      >
        <label
          htmlFor="file-upload"
          className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-gray-50"
        >
          {previewImage ? (
            <div className="relative h-full w-full">
              <img
                src={previewImage}
                alt="Preview"
                className="h-full w-full rounded-lg object-contain py-3"
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setPreviewImage(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img
                width={30}
                height={30}
                src="/images/icon/icon-image.png"
                alt=""
              />
              <p className="mt-2 text-sm text-gray-500">
                Drag and drop an image, or{" "}
                <span className="text-blue-500">Upload</span>
              </p>
            </div>
          )}
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
        </label>
      </div>
      <div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}

export default AddData;
