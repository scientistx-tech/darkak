import React, { useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useUploadFormDataMutation } from "@/redux/services/admin/adminCategoryApis";
import { toast } from "react-toastify";
import SelectField from "@/app/(root)/user/profile/components/SelectField";

type AddDataProps = {
  refetch: () => void;
  categories:
    | {
        id: number;
        title: string;
        icon: string;
        _count: { products: number };
      }[]
    | undefined;
};

function AddSubSubCategories({ refetch, categories }: AddDataProps) {
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

  console.log("categories", categories);

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="text-xl font-semibold">Add Sub Sub Category</div>

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

      <Input
        placeholder={`Sub sub category name (${currentLanguage === "en" ? "EN" : "BD"})`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SelectField
          // label="Marital Status"
          value={selectedCategoryPriority}
          onChange={(value: string) => handlePriorityChange(value)}
          options={[
            { label: "Select main category", value: "" },
            ...(categories?.map((category: any) => ({
              label: category.title,
              value: category.id,
            })) || []),
          ]}
        />
        <SelectField
          // label="Marital Status"
          value={selectedCategoryPriority}
          onChange={(value: string) => handlePriorityChange(value)}
          options={[
            { label: "Select sub category", value: "" },
            ...(categories?.map((category: any) => ({
              label: category.title,
              value: category.id,
            })) || []),
          ]}
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

      <div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}

export default AddSubSubCategories;
