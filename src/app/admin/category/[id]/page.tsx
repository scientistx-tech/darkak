"use client";

import React, { use, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";

import { toast } from "react-toastify";
import { useUpdateCategoryMutation } from "@/redux/services/adminCategoryApis";

interface EditDataProps {
  params: Promise<{ id: string }>;
}

function EditData({ params }: EditDataProps) {
  const { id } = use(params);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  return (
    <div className="flex w-auto flex-col gap-3 px-6 py-4 sm:w-[50%] sm:px-7 sm:py-5 xl:px-8.5">
      <div className="text-xl font-semibold">Edit Category</div>

      <Input
        placeholder="Category Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-2"
      />

      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          className="mt-2 h-32 w-32 rounded object-cover"
        />
      )}

      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Updating..." : "Update"}
      </Button>
    </div>
  );
}

export default EditData;
