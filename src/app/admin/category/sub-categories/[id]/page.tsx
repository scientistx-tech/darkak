"use client";

import React, { use, useRef, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { toast } from "react-toastify";
import { useUpdateCategoryMutation } from "@/redux/services/admin/adminCategoryApis";
import SelectField from "@/app/(root)/user/profile/components/SelectField";

interface EditDataProps {
  params: Promise<{ id: string }>;
}

function EditData({ params }: EditDataProps) {
  const { id } = use(params);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [selectedCategoryPriority, setSelectedCategoryPriority] =
    useState("Select Priority");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

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
      await updateCategory({ categoryId: id, formData }).unwrap();
      toast.success("Category updated successfully!");
      setTitle("");
      setImageFile(null);
      setPreviewImage(null);
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category.");
    }
  };

  const handlePriorityChange = (value: string) => {
    setSelectedCategoryPriority(value);
  };

  return (
    <div className="flex w-full flex-col gap-3 rounded bg-white p-5">
      <div className="text-xl font-semibold">Edit Sub Category</div>

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
            { label: "Select main category", value: "" },
            // ...(categories?.map((category: any) => ({
            //   label: category.title,
            //   value: category.id,
            // })) || []),
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
          {isLoading ? "Submitting..." : "Update"}
        </Button>
      </div>
    </div>
  );
}

export default EditData;
