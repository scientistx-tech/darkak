import { Product } from "@/types/apiTypes";
import baseApi from "../../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Product Attribute

    createProductAttribute: builder.mutation<any, { title: string }>({
      query: (data) => ({
        url: "/admin/attribute/create",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),

    getProductAttributes: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";

        return {
          url: `/admin/attribute/get${queryString}`,
          method: "GET",
        };
      },
    }),

    updateProductAttribute: builder.mutation<
      any,
      {
        id: string;
        data: { title: string };
      }
    >({
      query: ({ id, data }: { id: string; data: { title: string } }) => ({
        url: `/admin/attribute/update/${id}`,
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),

    deleteProductAttribute: builder.mutation<any, string>({
      query: (id) => ({
        url: `/admin/attribute/delete/${id}`,
        method: "DELETE", // or "PATCH" depending on your API
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),

    // products

    createProduct: builder.mutation<any, Product>({
      query: (data) => ({
        url: "/admin/product/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),

    getProducts: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/product/get${queryString}`,
          method: "GET",
        };
      },
    }),

    deleteProduct: builder.mutation<any, number>({
      query: (productId) => ({
        url: `/admin/product/delete/${productId}`,
        method: "DELETE",
      }),
    }),

    // change product status

    updateDraftStatus: builder.mutation<
      any,
      {
        id: string;
        data: { status: boolean };
      }
    >({
      query: ({ id, data }: { id: string; data: { status: boolean } }) => ({
        url: `/admin/product/update/drafted/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),

    updateTodaysDealStatus: builder.mutation<
      any,
      {
        id: string;
        data: { status: boolean };
      }
    >({
      query: ({ id, data }: { id: string; data: { status: boolean } }) => ({
        url: `/admin/product/update/deal/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),

    updateFeatureStatus: builder.mutation<
      any,
      {
        id: string;
        data: { status: boolean };
      }
    >({
      query: ({ id, data }: { id: string; data: { status: boolean } }) => ({
        url: `/admin/product/update/feature/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),

    // image uploads

    uploadImages: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "/admin/product/upload-multiple-images",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateProductAttributeMutation,
  useDeleteProductAttributeMutation,
  useGetProductAttributesQuery,
  useUpdateProductAttributeMutation,
  useCreateProductMutation,
  useGetProductsQuery,
  useUploadImagesMutation,
  useDeleteProductMutation,
  useUpdateFeatureStatusMutation,
  useUpdateTodaysDealStatusMutation,
  useUpdateDraftStatusMutation,
} = adminApi;
