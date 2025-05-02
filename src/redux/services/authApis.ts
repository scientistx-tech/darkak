import { Admin, AdminLoginResponse } from "@/types/apiTypes";
import baseApi from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmin: builder.query<Admin, void>({
      query: () => `/admin`,
    }),
    adminLogin: builder.mutation<
      AdminLoginResponse,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: `/auth/login-admin`,
        body: body,
        method: "POST",
      }),
    }),
    adminPassWordChange: builder.mutation<
      AdminLoginResponse,
      { password: string; oldPassword: string }
    >({
      query: (body) => ({
        url: `/admin/change-password`,
        body: body,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAdminQuery,
  useAdminLoginMutation,
  useAdminPassWordChangeMutation,
} = authApi;
