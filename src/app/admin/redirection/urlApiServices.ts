import baseApi from '../../../redux/baseApi';
import { Url, UrlRequest, UrlResponse } from './type';

export const urlApiService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUrls: builder.query<UrlResponse, void>({
      query: () => ({
        url: `/admin/url`,
        method: 'GET',
      }),
    }),
    createUrl: builder.mutation<void, UrlRequest>({
      query: (body) => ({
        url: `/admin/url`,
        method: 'POST',
        body,
      }),
    }),
    updateUrl: builder.mutation<void, UrlRequest & { id: number }>({
      query: (body) => ({
        url: `/admin/url/${body.id}`,
        method: 'PUT',
        body: { ...body, id: undefined },
      }),
    }),
    deleteUrl: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/admin/url/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetUrlsQuery, useDeleteUrlMutation, useUpdateUrlMutation, useCreateUrlMutation } =
  urlApiService;
