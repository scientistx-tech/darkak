"use client";
import React, { useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { useUploadFormDataBrandMutation } from "@/redux/services/admin/adminBrandApis";
import Image from "next/image";
import { useAccess } from "@/hooks/use-access";
import RequireAccess from "@/components/Layouts/RequireAccess";

function AddBrandData() {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [selectedCategoryPriority, setSelectedCategoryPriority] =
    useState("Select Priority");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadFormData, { isLoading }] = useUploadFormDataBrandMutation();

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
      toast.success("Brand created successfully!");
      setTitle("");
      setImageFile(null);
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error("Failed to create brand.");
    }
  };
  const handlePriorityChange = (value: string) => {
    setSelectedCategoryPriority(value);
  };

  return (
    <RequireAccess permission="brand">
      <div className="flex w-full flex-col gap-3 bg-white p-5">
        <div className="text-xl font-semibold">Add Brand</div>

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

        <div className="grid grid-cols-1 gap-4">
          <Input
            placeholder={`Brand Name (${currentLanguage === "en" ? "EN" : "BD"}) Ex: RFL`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* <Input
          placeholder={`Image Alt Text`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /> */}
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
                <Image
                  src={previewImage}
                  alt="Preview"
                  className="h-full w-full rounded-lg object-contain py-3"
                  width={150}
                  height={150}
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
                <Image
                  width={30}
                  height={30}
                  src="/images/icon/icon-image.png"
                  alt="image-icon"
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
    </RequireAccess>
  );
}

export default AddBrandData;
