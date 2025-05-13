"use client";

import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import * as yup from "yup";
import { useUploadFormDataMutation } from "@/redux/services/adminApis";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  icon: yup
    .mixed()
    .required("Image is required")
    .test(
      "fileExist",
      "Image is required",
      (value: any) => value && value.length > 0,
    ),
});

function AddData() {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ title?: string; icon?: string }>({});
  const [uploadFormData] = useUploadFormDataMutation();

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
    const formValues = {
      title,
      icon: imageFile ? [imageFile] : null,
    };

    try {
      await schema.validate(formValues, { abortEarly: false });
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", imageFile as File);
      const res = await uploadFormData(formData).unwrap();
      console.log("Upload success:", res);

      console.log("Submitted FormData:", formValues);

      toast.success("Category upload successful");
      setTitle("");
      setImageFile(null);
      setPreviewImage(null);
      setErrors({});
    } catch (validationError: any) {
      const newErrors: any = {};
      validationError.inner.forEach((err: any) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      toast.error("unknown error");
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
      {errors.title && (
        <span className="text-sm text-red-500">{errors.title}</span>
      )}

      <input
        type="file"
        accept="icon/*"
        onChange={handleImageChange}
        className="mt-2"
      />
      {errors.icon && (
        <span className="text-sm text-red-500">{errors.icon}</span>
      )}

      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          className="mt-2 h-32 w-32 rounded object-cover"
        />
      )}

      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

export default AddData;
