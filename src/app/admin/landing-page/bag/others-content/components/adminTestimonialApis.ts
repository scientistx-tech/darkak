import baseApi from '@/redux/baseApi';

export const adminTestimonialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => '/admin/bag/review',
    }),
    createTestimonial: builder.mutation({
      query: (data) => ({
        url: '/admin/bag/review',
        method: 'POST',
        body: data,
      }),
    }),
    updateTestimonial: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/bag/review/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/admin/bag/review/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTestimonialsQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} = adminTestimonialApi;
