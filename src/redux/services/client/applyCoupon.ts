import baseApi from "@/redux/baseApi";

export const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkCouponCode: builder.mutation<any, any>({
      query: ({ code, data }) => ({
        url: `/public/check-coupon/${code}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCheckCouponCodeMutation } = couponApi;
