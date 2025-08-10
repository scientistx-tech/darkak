import baseApi from '@/redux/baseApi';

export const adminBagCategoryApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBagCategories: builder.query({
      query: () => '/admin/bag/category',
    }),
    createBagCategory: builder.mutation({
      query: (data) => ({
        url: '/admin/bag/category/create',
        method: 'POST',
        body: data,
      }),
    }),
    updateBagCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/bag/category/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteBagCategory: builder.mutation({
      query: (id) => ({
        url: `/admin/bag/category/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetBagCategoriesQuery,
  useCreateBagCategoryMutation,
  useUpdateBagCategoryMutation,
  useDeleteBagCategoryMutation,
} = adminBagCategoryApis;
