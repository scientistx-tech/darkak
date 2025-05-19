import { AuthResponse, User } from "@/types/userTypes";
import baseApi from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<
      AuthResponse,
      Partial<
        Pick<
          User,
          | "name"
          | "phone"
          | "dob"
          | "gender"
          | "marital_status"
          | "anniversary_date"
        >
      >
    >({
      query: (body) => ({
        url: `/user/update`,
        body: body,
        method: "PUT",
      }),
    }),
    updateUserAddress: builder.mutation<
      AuthResponse,
      { area: string; division: string; sub_district: string; district: string }
    >({
      query: (body) => ({
        url: `/user/update/address`,
        body: body,
        method: "PUT",
      }),
    }),
    updateUserProfilePicture: builder.mutation<any, FormData>({
      query: (body) => ({
        url: `/user/upload-picture`,
        body: body,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useUpdateUserAddressMutation,
  useUpdateUserProfilePictureMutation,
} = authApi;
