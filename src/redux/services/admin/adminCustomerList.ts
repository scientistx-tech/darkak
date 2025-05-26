import { User } from "@/types/admin/customerListTyes";
import baseApi from "../../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomersList: builder.query({
      query: (params?: Record<any, any>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/user/get${queryString}`,
          method: "GET",
        };
      },
    }),

    toggleBlockUser: builder.mutation<{ message: string; data: User }, number>({
      query: (id) => ({
        url: `/admin/user/toggle-block-unblock/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useGetCustomersListQuery, useToggleBlockUserMutation } =
  adminApi;
