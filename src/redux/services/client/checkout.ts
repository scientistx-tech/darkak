import baseApi from "@/redux/baseApi";
import { AddToCartPayload, CartResponse } from "@/types/client/myCartTypes";

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    orderSingleProduct: builder.mutation<any, any>({
      query: (data) => ({
        url: "/public/order",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),

    orderCartProducts: builder.mutation<any, any>({
      query: (data) => ({
        url: "/public/order-from-cart",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
});

export const { useOrderCartProductsMutation, useOrderSingleProductMutation } =
  checkoutApi;
