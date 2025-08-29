import baseApi from '@/redux/baseApi';
import { IWishlistItem, IWishlistRequest, PosOrderInput } from './type';

export const posApiServices = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Product Attribute

    getPosData: builder.query<IWishlistItem[], { id: number }>({
      query: ({ id }) => ({
        url: `/admin/pos/label/${id}`,
        method: 'GET',
      }),
    }),
    createPosData: builder.mutation<IWishlistItem, IWishlistRequest>({
      query: (body) => ({
        url: `/admin/pos/create-label`,
        method: 'POST',
        body,
      }),
    }),
    createPosOrder: builder.mutation<{ order: { id: number } }, PosOrderInput>({
      query: (body) => ({
        url: `/admin/pos/order`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetPosDataQuery, useCreatePosDataMutation, useCreatePosOrderMutation } =
  posApiServices;
