import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Define validation schema
const schema = yup.object().shape({
  title: yup.string().required("Category title is required"),
  image: yup
    .mixed<FileList>()
    .required("Image is required")
    .test("fileExist", "Image is required", (value) => {
      return value instanceof FileList && value.length > 0;
    }),
});

// Define form types
interface FormValues {
  title: string;
  image: FileList;
}

function AddData() {
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

    reset();
    setPreviewImage(null);
  };

  return (
    <div className="flex flex-col gap-3 px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
      <div className="text-xl font-semibold">Add Category</div>

      {/* Title Input */}
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Category Title"
            error={errors.title?.message || ""}
          />
        )}
      />

      {/* Image Input */}
      <Controller
        name="image"
        control={control}
        defaultValue={null as any}
        render={({ field }) => (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files;
                field.onChange(files);
                const file = files?.[0];
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

export default AddData;
