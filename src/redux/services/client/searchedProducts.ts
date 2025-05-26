import baseApi from "@/redux/baseApi";

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchPublic: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? new URLSearchParams(params).toString()
          : "";
        return {
          url: `/public/filter?${queryString}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetSearchPublicQuery } = searchApi;
