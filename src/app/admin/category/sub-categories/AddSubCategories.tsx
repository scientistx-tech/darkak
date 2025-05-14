import React, { useRef, useState } from "react";
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
  categories:
    | {
        id: number;
        title: string;
        icon: string;
        _count: { products: number };
      }[]
    | undefined;
};

// Validation schema using Yup
const schema = yup.object().shape({
  title: yup.string().required("Sub Category Name is required"),
  categoryId: yup.string().required("Main Category is required"),
});

function AddSubCategories({ refetch, categories }: AddDataProps) {
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
      title: "",
      categoryId: "",
    },
  });

  const onSubmit = async (data: any) => {
    // const formData = new FormData();

    // formData.append("title", data.title);
    // formData.append("categoryId", data.categoryId);

    const formData = {
      title: data?.title,
      categoryId: data?.categoryId,
    };

    try {
      await uploadFormData(formData).unwrap();
      toast.success("Sub Category created successfully!");
      refetch(); // Refetch the data after successful submission
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error("Failed to create sub category.");
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="text-xl font-semibold">Add Sub Category</div>

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
                value={
                  categories
                    ?.find(
                      (category: any) => category.id.toString() === field.value,
                    )
                    ?.id.toString() || "" // Ensure the selected value is a string
                } // Ensure the selected value is displayed correctly
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
      <div>
        <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}

export default AddSubCategories;
