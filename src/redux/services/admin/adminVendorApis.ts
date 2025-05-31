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
  }),
});

export const { useGetAllVendorsQuery } = adminVendorApi;
