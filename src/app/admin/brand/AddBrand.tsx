import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Schema validation
const schema = yup.object().shape({
  title: yup.string().required("Brand title is required"),
  image: yup
    .mixed<FileList>()
    .required("Image is required")
    .test("fileExist", "Image is required", (value) => {
      return value && value.length > 0;
    }),
});


interface FormValues {
  title: string;
  image: FileList;
}

function AddBrand() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onSubmit = (data: FormValues) => {
    const imageFile = data.image[0];

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("image", imageFile);

    console.log("Submitted:", data.title, imageFile);
    toast.success("Brand submitted successfully!");

    reset();
    setPreviewImage(null);
  };

  return (
    <div className="flex flex-col gap-3 px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
      <div className="text-xl font-semibold">Add Brand</div>

      {/* Title Input */}
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Brand Title"
            error={errors.title?.message || ""}
          />
        )}
      />

      {/* File Input */}
      <Controller
        name="image"
        control={control}
        render={({ field }) => (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                field.onChange(e.target.files);
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="mt-2"
            />
            {errors.image && (
              <span className="text-sm text-red-500">{errors.image.message}</span>
            )}
          </>
        )}
      />

      {/* Preview */}
      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          className="mt-2 h-32 w-32 rounded object-cover"
        />
      )}

      {/* Submit */}
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </div>
  );
}

export default AddBrand;
