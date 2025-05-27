import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  useCreateSubSubCategoryMutation,
  useUpdateSubSubCategoryMutation,
  useUploadFormDataMutation,
} from "@/redux/services/admin/adminCategoryApis";
import { toast } from "react-toastify";
import SelectField from "@/app/(root)/user/profile/components/SelectField";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  subCategories: {
    id: number;
    title: string;
    categoryId: number;
    _count:
      | {
          products: number;
        }[]
      | undefined;
    category: {
      id: number;
      title: string;
      icon: string;
      serial: number;
      isActive: boolean;
      _count:
        | {
            products: number;
          }[]
        | undefined;
    };
  }[];
  value?: {
    id: string;
    title: string;
    categoryId: string;
    subCategoryId: string;
  };
  setIsEditable?: (arg: {
    status: boolean;
    value: {
      id: string;
      title: string;
      categoryId: string;
      subCategoryId: string;
    };
  }) => void;
};

// Validation schema using Yup
const schema = yup.object().shape({
  title: yup.string().required("Sub Category Name is required"),
  categoryId: yup.string().required("Main Category is required"),
  subCategoryId: yup.string().required("Sub Category is required"),
});

function AddSubSubCategories({
  refetch,
  categories,
  subCategories,
  value,
  setIsEditable,
}: AddDataProps) {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [uploadFormData, { isLoading }] = useCreateSubSubCategoryMutation();
  const [updateSubSubCategory, { isLoading: loadingUpdate }] =
    useUpdateSubSubCategoryMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: value?.title || "",
      categoryId: value?.categoryId || "",
      subCategoryId: value?.subCategoryId || "",
    },
  });

  useEffect(() => {
    if (value) {
      reset({
        title: value.title || "",
        categoryId: value.categoryId || "",
        subCategoryId: value?.subCategoryId || "",
      });
    }
  }, [value, reset]);

  const selectedCategoryId = watch("categoryId");
  const filteredSubCategories = subCategories.filter(
    (sCat: any) => Number(sCat?.categoryId) === Number(selectedCategoryId),
  );

  console.log("selected cat", selectedCategoryId);
  console.log("filtered sub cat", filteredSubCategories);

  const onSubmit = async (data: any) => {
    const formData = {
      title: data?.title,
      categoryId: parseInt(data?.categoryId),
      subCategoryId: parseInt(data?.subCategoryId),
    };

    try {
      if (value && value?.id) {
        await updateSubSubCategory({
          subSubCategoryId: value?.id,
          formData,
        }).unwrap();
        toast.success("Sub Sub Category Updated successfully!");
        if (setIsEditable) {
          setIsEditable({
            status: false,
            value: { id: "", title: "", categoryId: "", subCategoryId: "" },
          });
        }
      } else {
        const res = await uploadFormData(formData).unwrap();
        toast.success(res.message || "Sub Sub Category created successfully!");
      }
      refetch();
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create category.");
      console.error("Error uploading:", error);
    }
  };

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div>
          <Input
            placeholder={`Sub sub category name (${currentLanguage === "en" ? "EN" : "BD"})`}
            {...register("title")}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
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
        <div>
          <Controller
            name="subCategoryId"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                options={[
                  { label: "Select sub category", value: "" },
                  ...(filteredSubCategories?.map((subCategory: any) => ({
                    label: subCategory.title,
                    value: subCategory.id.toString(), // Ensure value is a string
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

      <div>
        <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}

export default AddSubSubCategories;
