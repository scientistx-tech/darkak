import baseApi from "@/redux/baseApi";

export const publicSliderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicSliders: builder.query({
      query: () => ({
        url: `/public/slider`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetPublicSlidersQuery } = publicSliderApi;
