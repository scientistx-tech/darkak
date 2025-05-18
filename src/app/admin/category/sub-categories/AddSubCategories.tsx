import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import SelectField from "@/app/(root)/user/profile/components/SelectField";
import { useCreateSubCategoryMutation } from "@/redux/services/admin/adminCategoryApis";
import { toast } from "react-toastify";

type AddDataProps = {
  refetch: () => void;
  categories: {
    id: number;
    title: string;
    icon: string;
    serial: number;
    isActive: true;
    _count:
      | {
          products: number;
        }[]
      | undefined;
  }[];

  value?: {
    id: string;
    title: string;
    categoryId: string;
  };
  setIsEditable?: (arg: {
    status: boolean;
    value: { id: string; title: string; categoryId: string };
  }) => void;
};

// Validation schema using Yup
const schema = yup.object().shape({
  title: yup.string().required("Sub Category Name is required"),
  categoryId: yup.string().required("Main Category is required"),
});

function AddSubCategories({
  refetch,
  categories,
  value,
  setIsEditable,
}: AddDataProps) {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadFormData, { isLoading }] = useCreateSubCategoryMutation();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: value?.title || "",
      categoryId: value?.categoryId || "",
    },
  });

  useEffect(() => {
    if (value) {
      reset({
        title: value.title || "",
        categoryId: value.categoryId || "",
      });
    }
  }, [value, reset]);

  const onSubmit = async (data: any) => {
    // const formData = new FormData();

    // formData.append("title", data.title);
    // formData.append("categoryId", data.categoryId);

    const formData = {
      title: data?.title,
      categoryId: parseInt(data?.categoryId),
    };

    try {
      await uploadFormData(formData).unwrap();
      toast.success("Sub Category created successfully!");
      if (setIsEditable) {
        setIsEditable({
          status: false,
          value: { id: "", title: "", categoryId: "" },
        });
      }
      refetch(); // Refetch the data after successful submission
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error("Failed to create sub category.");
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold">
        <span className="text-yellow-600">📋</span>{" "}
        {value?.id ? "Edit Sub Category" : "Sub Category Setup"}
      </h1>
      {/* Language Tabs */}
      <div className="my-5 flex items-center gap-x-5">
        <div
          className={`${
            currentLanguage === "en"
              ? "border-b-2 border-blue-500 text-blue-500"
              : ""
          } flex cursor-pointer py-2 text-sm font-medium tracking-wider`}
          onClick={() => setCurrentLanguage("en")}
        >
          <button>English (EN)</button>
        </div>
        <div
          className={`${
            currentLanguage === "bn"
              ? "border-b-2 border-blue-500 text-blue-500"
              : ""
          } cursor-pointer py-2 text-sm font-medium tracking-wider`}
          onClick={() => setCurrentLanguage("bn")}
        >
          <button>Bengali (BD)</button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Sub Category Name */}
        <div>
          <Input
            placeholder={`Sub Category Name (${currentLanguage === "en" ? "EN" : "BD"})`}
            {...register("title")}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Main Category Select */}
        <div>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                options={[
                  { label: "Select main category", value: "" },
                  ...(categories?.map((category: any) => ({
                    label: category.title,
                    value: category.id.toString(), // Ensure value is a string
                  })) || []),
                ]}
                onChange={(value: string) => {
                  field.onChange(value); // Update the value in the form
                }}
                value={field.value}
              />
            )}
          />
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.categoryId.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center gap-3">
        {value?.id && (
          <Button
            onClick={() => {
              if (setIsEditable) {
                setIsEditable({
                  status: false,
                  value: { id: "", title: "", categoryId: "" },
                });
              }
            }}
            className="bg-red-500"
          >
            Cancel
          </Button>
        )}
        <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
          {value?.id
            ? isLoading
              ? "Updating..."
              : "Update"
            : isLoading
              ? "Submiting..."
              : "Submit"}
        </Button>
      </div>
    </div>
  );
}

export default AddSubCategories;
