import baseApi from '@/redux/baseApi';

export const adminWatchCategoryApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWatchCategories: builder.query({
      query: () => '/admin/electronics/category',
    }),
    createWatchCategory: builder.mutation({
      query: (data) => ({
        url: '/admin/electronics/category/create',
        method: 'POST',
        body: data,
      }),
    }),
    updateWatchCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/electronics/category/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteWatchCategory: builder.mutation({
      query: (id) => ({
        url: `/admin/electronics/category/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetWatchCategoriesQuery,
  useCreateWatchCategoryMutation,
  useUpdateWatchCategoryMutation,
  useDeleteWatchCategoryMutation,
} = adminWatchCategoryApis;
