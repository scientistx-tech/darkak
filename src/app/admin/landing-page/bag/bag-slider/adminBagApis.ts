import baseApi from '@/redux/baseApi';

export const adminBagApis = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBagSliders: build.query<any, void>({
      query: () => `/admin/bag/slider`,
    }),

    createBagSlider: build.mutation<any, FormData>({
      query: (body) => ({
        url: `/admin/bag/slider/create`,
        method: 'POST',
        body,
      }),
    }),

    updateBagSlider: build.mutation<any, { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/admin/bag/slider/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    deleteBagSlider: build.mutation<any, number>({
      query: (id) => ({
        url: `/admin/bag/slider/${id}`,
        method: 'DELETE',
      }),
    }),

    createBagProduct: build.mutation<any, any>({
      query: (body) => ({
        url: `/admin/bag/product/create`,
        method: 'POST',
        body,
      }),
    }),

    updateBagProduct: build.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/admin/bag/product/${id}`,
        method: 'PUT',
        body,
      }),
    }),

    getBagProductById: build.query<any, string>({
      query: (id) => `/admin/bag/product/${id}`,
    }),

    getBagProducts: build.query<
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
        return `/admin/bag/product${queryString ? `?${queryString}` : ''}`;
      },
    }),

    deleteBagProduct: build.mutation<any, number>({
      query: (id) => ({
        url: `/admin/bag/product/${id}`,
        method: 'DELETE',
      }),
    }),

    changeBagProductStatus: build.mutation<
      { message: string },
      { id: number; status: 'drafted' | 'seller' | 'arival' }
    >({
      query: ({ id, status }) => ({
        url: `/admin/bag/product/status/${id}`,
        method: 'POST',
        body: { status },
      }),
    }),
  }),
});

export const {
  useGetBagSlidersQuery,
  useCreateBagSliderMutation,
  useDeleteBagSliderMutation,
  useUpdateBagSliderMutation,
  useCreateBagProductMutation,
  useGetBagProductsQuery,
  useDeleteBagProductMutation,
  useChangeBagProductStatusMutation,
  useUpdateBagProductMutation,
  useGetBagProductByIdQuery,
} = adminBagApis;
