import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const initialState = {};

export const tableApi = createApi({
  reducerPath: "tableApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3001/api`,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  tagTypes: ["TABLE"],
  endpoints: (builder) => ({
    getTableMsg: builder.query<any, void>({
      query: () => "/stock",
      providesTags: ["TABLE"],
    }),
    postTableMsg: builder.mutation({
      query: (payload) => ({
        url: `/stock`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["TABLE"],
    }),
    updateTableMsg: builder.mutation({
      query: (payload) => ({
        url: `/stock/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["TABLE"],
    })
  }),
});

export const { useGetTableMsgQuery, usePostTableMsgMutation, useUpdateTableMsgMutation } = tableApi;
