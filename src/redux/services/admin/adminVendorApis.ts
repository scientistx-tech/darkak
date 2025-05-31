import baseApi from "@/redux/baseApi";

export const adminVendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useGetAllVendorsQuery, useCreateVendorMutation } =
  adminVendorApi;
