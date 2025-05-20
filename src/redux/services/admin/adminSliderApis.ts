import baseApi from "../../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteSlider: builder.mutation<any, number>({
      query: (sliderId) => ({
        url: `/admin/brand/delete/${sliderId}`,
        method: "DELETE",
      }),
    }),

    getAllSliders: builder.query({
      query: () => ({
        url: "/admin/slider/get",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    uploadFormDataSlider: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `/admin/slider/create`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useDeleteSliderMutation,
  useGetAllSlidersQuery,
  useUploadFormDataSliderMutation,
} = adminApi;
