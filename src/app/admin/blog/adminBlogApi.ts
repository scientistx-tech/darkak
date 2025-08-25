import baseApi from '../../../redux/baseApi';
import { BlogResponse, CrateBlogType } from './type';

export const adminBlogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogList: builder.query<BlogResponse, { page: number }>({
      query: ({ page }) => ({
        url: `/admin/blog?page=${page}&limit=10`,
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

    updateBlogList: builder.mutation<any, any>({
      query: (formData) => ({
        url: `/admin/page/update-banner`,
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetBlogListQuery,
  useUpdateBlogListMutation,
  useGetBlogStatusChangeMutation,
  useGetBlogDeleteMutation,
  useGetBlogCreateMutation,
} = adminBlogApi;
