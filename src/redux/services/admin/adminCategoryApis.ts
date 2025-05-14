import baseApi from "../../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFormData: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `/admin/category/create`,
        method: "POST",
        body: formData,
      }),
    }),

    updateCategory: builder.mutation<
      any,
      { categoryId: string; formData: FormData }
    >({
      query: ({ categoryId, formData }) => ({
        url: `/admin/category/create/${categoryId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteCategory: builder.mutation<any, number>({
      query: (categoryId) => ({
        url: `/admin/category/create/${categoryId}`,
        method: "DELETE",
      }),
    }),

    getCategories: builder.query<
      {
        totalPage: number;
        data: {
          id: number;
          title: string;
          serial: number;
          icon: string;
          _count: { products: number };
        }[];
      },
      void
    >({
      query: () => ({
        url: `/admin/category/create`,
        method: "GET",
      }),
    }),

    // sub category

    createSubCategory: builder.mutation<
      any,
      { title: string; categoryId: string }
    >({
      query: (data) => ({
        url: `/admin/category/sub-category`,
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),

    updateSubCategory: builder.mutation<
      any,
      { subCategoryId: string; formData: FormData }
    >({
      query: ({ subCategoryId, formData }) => ({
        url: `/admin/category/sub-category/${subCategoryId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteSubCategory: builder.mutation<any, number>({
      query: (subCategoryId) => ({
        url: `/admin/category/sub-category/${subCategoryId}`,
        method: "DELETE",
      }),
    }),

    getSubCategories: builder.query<
      {
        totalPage: number;
        data: {
          id: number;
          title: string;
          categoryId: number;
        }[];
      },
      void
    >({
      query: () => ({
        url: `/admin/category/sub-category`,
        method: "GET",
      }),
    }),

    // sub sub category

    createSubSubCategory: builder.mutation<
      any,
      { title: string; categoryId: string }
    >({
      query: (data) => ({
        url: `/admin/category/sub-sub-category`,
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),

    updateSubSubCategory: builder.mutation<
      any,
      { subSubCategoryId: string; formData: FormData }
    >({
      query: ({ subSubCategoryId, formData }) => ({
        url: `/admin/category/sub-sub-category/${subSubCategoryId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteSubSubCategory: builder.mutation<any, number>({
      query: (subSubCategoryId) => ({
        url: `/admin/category/sub-category/${subSubCategoryId}`,
        method: "DELETE",
      }),
    }),

    getSubSubCategories: builder.query<
      {
        totalPage: number;
        data: {
          id: number;
          title: string;
          categoryId: number;
        }[];
      },
      void
    >({
      query: () => ({
        url: `/admin/category/sub-sub-category`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUploadFormDataMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
  useUpdateSubCategoryMutation,
  useCreateSubSubCategoryMutation,
  useDeleteSubSubCategoryMutation,
  useGetSubSubCategoriesQuery,
  useUpdateSubSubCategoryMutation,
} = adminApi;
