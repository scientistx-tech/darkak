import baseApi from '@/redux/baseApi';



export const electronicsBannerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getWatchBrands: builder.query({
      query: () => `/admin/electronics/brand`,
    }),
    addWatchBrand: builder.mutation({
      query: (formData) => ({
        url: `/admin/electronics/brand/create`,
        method: 'POST',
        body: formData,
      }),
    }),
    updateWatchBrand: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/electronics/brand/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),
    deleteWatchBrand: builder.mutation({
      query: (id) => ({
        url: `/admin/electronics/brand/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddWatchBrandMutation,
  useUpdateWatchBrandMutation,
  useDeleteWatchBrandMutation,
  useGetWatchBrandsQuery,
} = electronicsBannerApi;
