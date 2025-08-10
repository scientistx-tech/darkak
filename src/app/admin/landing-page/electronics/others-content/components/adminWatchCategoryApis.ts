import baseApi from '@/redux/baseApi';

export const adminWatchCategoryApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWatchCategories: builder.query({
      query: () => '/admin/watch/category',
    }),
    createWatchCategory: builder.mutation({
      query: (data) => ({
        url: '/admin/watch/category/create',
        method: 'POST',
        body: data,
      }),
    }),
    updateWatchCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/watch/category/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteWatchCategory: builder.mutation({
      query: (id) => ({
        url: `/admin/watch/category/${id}`,
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
