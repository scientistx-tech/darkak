import baseApi from '@/redux/baseApi';

export const watchBrandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWatchBrands: builder.query({
      query: () => `/admin/watch/brand`,
    }),
    addWatchBrand: builder.mutation({
      query: (formData) => ({
        url: `/admin/watch/brand/create`,
        method: 'POST',
        body: formData,
      }),
    }),
    updateWatchBrand: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/watch/brand/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),
    deleteWatchBrand: builder.mutation({
      query: (id) => ({
        url: `/admin/watch/brand/${id}`,
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
} = watchBrandApi;
