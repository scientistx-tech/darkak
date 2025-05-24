// src/redux/services/categories.ts
import baseApi from "@/redux/baseApi";
import { Category } from "@/types/client/categoriesTypes";

export const allCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<{ data: Category[] }, void>({
      query: () => `/public/category`,
    }),
  }),
});

export const { useGetAllCategoriesQuery } = allCategoriesApi;
