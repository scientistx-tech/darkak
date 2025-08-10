import baseApi from '@/redux/baseApi';

export const adminSliderApis = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWatchSliders: build.query<any, void>({
      query: () => `/admin/watch/slider`,
    }),

    createWatchSlider: build.mutation<any, FormData>({
      query: (body) => ({
        url: `/admin/watch/slider/create`,
        method: 'POST',
        body,
      }),
    }),

    updateWatchSlider: build.mutation<any, { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/admin/watch/slider/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    deleteWatchSlider: build.mutation<any, number>({
      query: (id) => ({
        url: `/admin/watch/slider/${id}`,
        method: 'DELETE',
      }),
    }),
    createWatchProduct: build.mutation<any, any>({
      query: (body) => ({
        url: `/admin/watch/product/create`,
        method: 'POST',
        body,
      }),
    }),
    updateWatchProduct: build.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/admin/watch/product/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    getWatchProductById: build.query<any, string>({
      query: (id) => `/admin/watch/product/${id}`,
    }),
    getWatchProducts: build.query<
      any,
      {
        search?: string;
        subCategoryId?: string | number;
        brandId?: string | number;
        status?: string;
        sortBy?: string;
        availability?: string;
      } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params) {
          if (params.search) queryParams.append('search', params.search);
          if (params.subCategoryId)
            queryParams.append('subCategoryId', String(params.subCategoryId));
          if (params.brandId) queryParams.append('brandId', String(params.brandId));
          if (params.status) queryParams.append('status', params.status);
          if (params.sortBy) queryParams.append('sortBy', params.sortBy);
          if (params.availability) queryParams.append('availability', params.availability);
        }

        const queryString = queryParams.toString();

        return `/admin/watch/product${queryString ? `?${queryString}` : ''}`;
      },
    }),
    deleteWatchProduct: build.mutation<any, number>({
      query: (id) => ({
        url: `/admin/watch/product/${id}`,
        method: 'DELETE',
      }),
    }),
    changeWatchProductStatus: build.mutation<
      { message: string },
      { id: number; status: 'drafted' | 'seller' | 'arival' }
    >({
      query: ({ id, status }) => ({
        url: `/admin/watch/product/status/${id}`,
        method: 'POST',
        body: { status },
      }),
    }),
  }),
});

export const {
  useGetWatchSlidersQuery,
  useCreateWatchSliderMutation,
  useDeleteWatchSliderMutation,
  useUpdateWatchSliderMutation,
  useCreateWatchProductMutation,
  useGetWatchProductsQuery,
  useDeleteWatchProductMutation,
  useChangeWatchProductStatusMutation,
  useUpdateWatchProductMutation,
  useGetWatchProductByIdQuery,
} = adminSliderApis;
