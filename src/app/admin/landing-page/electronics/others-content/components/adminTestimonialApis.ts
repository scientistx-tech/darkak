import baseApi from '@/redux/baseApi';

export const adminTestimonialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => '/admin/electronics/review',
    }),
    createTestimonial: builder.mutation({
      query: (data) => ({
        url: '/admin/electronics/review',
        method: 'POST',
        body: data,
      }),
    }),
    updateTestimonial: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/electronics/review/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/admin/electronics/review/${id}`,
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
