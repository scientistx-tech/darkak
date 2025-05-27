import baseApi from "@/redux/baseApi";
import { NotificationResponse } from "@/types/client/notificationTypes";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationResponse, void>({
      query: () => `/user/notifications`,
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
