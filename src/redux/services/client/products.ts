import baseApi from "@/redux/baseApi";
import { AddToCartPayload, CartResponse } from "@/types/client/myCartTypes";

export const myCartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSinglePublicProductDetails: builder.query({
      query: (slug) => ({
        url: `/public/product/${slug}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getNewArivalProducts: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/public/new-arrival${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const {
  useGetSinglePublicProductDetailsQuery,
  useGetNewArivalProductsQuery,
} = myCartApi;
