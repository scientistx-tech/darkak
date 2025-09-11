import baseApi from '@/redux/baseApi';
import { Customer, ICustomer, IWishlistItem, IWishlistRequest, PosOrderInput } from './type';

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
    createOfflineUser: builder.mutation<ICustomer, Customer>({
      query: (body) => ({
        url: `/admin/pos/offline-user`,
        method: 'POST',
        body,
      }),
    }),
    getOfflineUser: builder.query<ICustomer[], void>({
      query: () => ({
        url: `/admin/pos/offline-user`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetPosDataQuery,
  useCreatePosDataMutation,
  useCreatePosOrderMutation,
  useGetOfflineUserQuery,
  useCreateOfflineUserMutation,
} = posApiServices;
