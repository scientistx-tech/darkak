import baseApi from "../baseApi";

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
  }),
});

export const {
  useUploadFormDataMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} = adminApi;
