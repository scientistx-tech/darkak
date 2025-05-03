import { AuthResponse, User } from "@/types/userTypes";
import baseApi from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => `/user/details`,
    }),
    emailLogin: builder.mutation<
      AuthResponse,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: `/auth/login-with-email`,
        body: body,
        method: "POST",
      }),
    }),
    emailRegistration: builder.mutation<
      AuthResponse,
      { email: string; password: string; name: string }
    >({
      query: (body) => ({
        url: `/auth/register-with-email`,
        body: body,
        method: "POST",
      }),
    }),
    verifyEmailOTP: builder.mutation<
      AuthResponse,
      { email: string; otp: string }
    >({
      query: (body) => ({
        url: `/auth/verify-email-otp`,
        body: body,
        method: "POST",
      }),
    }),
    // adminPassWordChange: builder.mutation<
    //   AdminLoginResponse,
    //   { password: string; oldPassword: string }
    // >({
    //   query: (body) => ({
    //     url: `/admin/change-password`,
    //     body: body,
    //     method: "POST",
    //   }),
    // }),
  }),
});

export const {
  useGetUserQuery,
  useEmailLoginMutation,
  useEmailRegistrationMutation,
  useVerifyEmailOTPMutation,
  // useAdminPassWordChangeMutation,
} = authApi;
