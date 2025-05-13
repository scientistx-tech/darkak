import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useUploadFormDataMutation } from "@/redux/services/admin/adminCategoryApis";
import { toast } from "react-toastify";

type AddDataProps = {
  refetch: () => void;
};

function AddData({ refetch }: AddDataProps) {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error("Failed to create category.");
    }
  };

  return (
    <div className="flex flex-col gap-3 px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
      <div className="text-xl font-semibold">Add Category</div>

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
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
}

export default AddData;
