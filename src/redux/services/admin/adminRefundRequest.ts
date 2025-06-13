import { get } from "http";
import baseApi from "../../baseApi";

export const adminRefundRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRefundRequest: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/refund/get/pending${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getAllApprovedRefundRequest: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/refund/get/approved${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getAllRejectedRefundRequest: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/refund/get/rejected${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getAllRefundedRefundRequest: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/refund/get/refunded${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getSingleRefundRequestDetails: builder.query({
      query: (id) => ({
        url: `/admin/refund/details/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    changeRefunRequestStatus: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/admin/refund/status-update/${id}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllRefundRequestQuery,
  useGetAllApprovedRefundRequestQuery,
  useGetAllRejectedRefundRequestQuery,
  useGetAllRefundedRefundRequestQuery,
  useGetSingleRefundRequestDetailsQuery,
  useChangeRefunRequestStatusMutation,
} = adminRefundRequestApi;
