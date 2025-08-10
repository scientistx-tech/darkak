import baseApi from '@/redux/baseApi';

export const bagBrandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBagBrands: builder.query({
      query: () => `/admin/bag/brand`,
    }),
    addBagBrand: builder.mutation({
      query: (formData) => ({
        url: `/admin/bag/brand/create`,
        method: 'POST',
        body: formData,
      }),
    }),
    updateBagBrand: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/bag/brand/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),
    deleteBagBrand: builder.mutation({
      query: (id) => ({
        url: `/admin/bag/brand/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddBagBrandMutation,
  useUpdateBagBrandMutation,
  useDeleteBagBrandMutation,
  useGetBagBrandsQuery,
} = bagBrandApi;
