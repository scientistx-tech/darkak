import baseApi from '../../../redux/baseApi';
import { BlogResponse } from './type';

export const clientBlogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogList: builder.query<BlogResponse, { page: number }>({
      query: ({ page }) => ({
        url: `/admin/blog?page=${page}&limit=10`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetBlogListQuery } = clientBlogApi;
