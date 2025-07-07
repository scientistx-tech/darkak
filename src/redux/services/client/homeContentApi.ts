// src/redux/services/public/publicContentApi.ts

import baseApi from "@/redux/baseApi";

export const publicContentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getHomeContent: builder.query<any, void>({
            query: () => ({
                url: '/public/home',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetHomeContentQuery } = publicContentApi;
