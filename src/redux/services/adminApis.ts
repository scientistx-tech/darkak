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

export const { useUploadFormDataMutation, useGetCategoriesQuery } = adminApi;
