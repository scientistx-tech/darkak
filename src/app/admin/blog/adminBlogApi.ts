import baseApi from '../../../redux/baseApi';
import { Blog, BlogResponse, CrateBlogType } from './type';

export const adminBlogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogList: builder.query<BlogResponse, { page: number }>({
      query: ({ page }) => ({
        url: `/admin/blog?page=${page}&limit=10`,
        method: 'GET',
      }),
    }),
    getBlogById: builder.query<Blog, { id: number }>({
      query: ({ id }) => ({
        url: `/admin/blog/${id}`,
        method: 'GET',
      }),
    }),

    getBlogStatusChange: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `/admin/blog/status/${id}`,
        method: 'POST',
      }),
    }),

    getBlogDelete: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `/admin/blog/${id}`,
        method: 'DELETE',
      }),
    }),

    getBlogCreate: builder.mutation<any, CrateBlogType>({
      query: (formData) => ({
        url: `/admin/blog`,
        method: 'POST',
        body: formData,
      }),
    }),

    updateBlog: builder.mutation<any, CrateBlogType & { id: string }>({
      query: (formData) => ({
        url: `/admin/blog/${formData.id}`,
        method: 'PUT',
        body: { ...formData, id: undefined },
      }),
    }),
  }),
});

export const {
  useGetBlogListQuery,
  useUpdateBlogMutation,
  useGetBlogStatusChangeMutation,
  useGetBlogDeleteMutation,
  useGetBlogCreateMutation,
  useGetBlogByIdQuery
} = adminBlogApi;
