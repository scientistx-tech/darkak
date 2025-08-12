import baseApi from '@/redux/baseApi';

export const adminElectronicsApis = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getElectronicsSliders: build.query<any, void>({
      query: () => `/admin/electronics/slider`,
    }),

    createElectronicsSlider: build.mutation<any, FormData>({
      query: (body) => ({
        url: `/admin/electronics/slider/create`,
        method: 'POST',
        body,
      }),
    }),

    updateElectronicsSlider: build.mutation<any, { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/admin/electronics/slider/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    deleteElectronicsSlider: build.mutation<any, number>({
      query: (id) => ({
        url: `/admin/electronics/slider/${id}`,
        method: 'DELETE',
      }),
    }),

    createElectronicsProduct: build.mutation<any, any>({
      query: (body) => ({
        url: `/admin/electronics/product/create`,
        method: 'POST',
        body,
      }),
    }),

    updateElectronicsProduct: build.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/admin/electronics/product/${id}`,
        method: 'PUT',
        body,
      }),
    }),

    getElectronicsProductById: build.query<any, string>({
      query: (id) => `/admin/electronics/product/${id}`,
    }),

    getElectronicsProducts: build.query<
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

        return `/admin/electronics/product${queryString ? `?${queryString}` : ''}`;
      },
    }),

    deleteElectronicsProduct: build.mutation<any, number>({
      query: (id) => ({
        url: `/admin/electronics/product/${id}`,
        method: 'DELETE',
      }),
    }),

    changeElectronicsProductStatus: build.mutation<
      { message: string },
      { id: number; status: 'drafted' | 'seller' | 'arival' }
    >({
      query: ({ id, status }) => ({
        url: `/admin/electronics/product/status/${id}`,
        method: 'POST',
        body: { status },
      }),
    }),
  }),
});

export const {
  useGetElectronicsSlidersQuery,
  useCreateElectronicsSliderMutation,
  useDeleteElectronicsSliderMutation,
  useUpdateElectronicsSliderMutation,
  useCreateElectronicsProductMutation,
  useGetElectronicsProductsQuery,
  useDeleteElectronicsProductMutation,
  useChangeElectronicsProductStatusMutation,
  useUpdateElectronicsProductMutation,
  useGetElectronicsProductByIdQuery,
} = adminElectronicsApis;
