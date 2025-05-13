import baseApi from "../../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFormDataBrand: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `/admin/brand/create`,
        method: "POST",
        body: formData,
      }),
    }),

    updateBrand: builder.mutation<
      any,
      { categoryId: string; formData: FormData }
    >({
      query: ({ categoryId, formData }) => ({
        url: `/admin/brand/update/${categoryId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteBrand: builder.mutation<any, number>({
      query: (categoryId) => ({
        url: `/admin/brand/delete/${categoryId}`,
        method: "DELETE",
      }),
    }),

    getBrands: builder.query<
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
        url: `/admin/brand/get`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUploadFormDataBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useGetBrandsQuery,
} = adminApi;
