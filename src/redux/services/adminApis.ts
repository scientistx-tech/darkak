import baseApi from "../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFormData: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `/admin/category/create`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadFormDataMutation } = adminApi;
