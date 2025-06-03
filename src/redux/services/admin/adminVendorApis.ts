import baseApi from "@/redux/baseApi";

export const adminVendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendorsReview: builder.query({
      query: ({
        id,
        params,
      }: {
        id: number;
        params?: Record<string, string>;
      }) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/vendor/reviews/${id}/${queryString}`,
          method: "GET",
        };
      },
    }),

    getVendorsTransaction: builder.query({
      query: ({
        id,
        params,
      }: {
        id: number;
        params?: Record<string, string>;
      }) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/vendor/transactions/${id}${queryString}`,
          method: "GET",
        };
      },
    }),

    getVendorsProduct: builder.query({
      query: ({ id }) => ({
        url: `/admin/vendor/products/${id}`,
        method: "GET",
      }),
    }),
    getVendorsOrder: builder.query({
      query: ({ id }) => ({
        url: `/admin/vendor/orders/${id}`,
        method: "GET",
      }),
    }),

    getVendorDetailsByIdAdmin: builder.query({
      query: ({ id }) => ({
        url: `/admin/vendor/details/${id}`,
        method: "GET",
      }),
    }),

    changeVendorStatus: builder.mutation<any, any>({
      query: (id) => ({
        url: `/admin/vendor/status-update-vendor/${id}`,
        method: "GET",
      }),
    }),

    getAllVendors: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/vendor/get${queryString}`,
          method: "GET",
        };
      },
    }),

    createVendor: builder.mutation<any, any>({
      query: (data) => ({
        url: "/admin/vendor/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetVendorsReviewQuery,
  useGetVendorsTransactionQuery,
  useGetVendorsProductQuery,
  useGetVendorsOrderQuery,
  useGetVendorDetailsByIdAdminQuery,
  useChangeVendorStatusMutation,
  useGetAllVendorsQuery,
  useCreateVendorMutation,
} = adminVendorApi;
