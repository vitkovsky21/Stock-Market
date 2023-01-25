import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const initialState = {};

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.apilayer.com/exchangerates_data`,
    credentials: "include",
    headers: {
      apikey: "rmGNSQVltEZtGQCE1eKaBbMSBvk4ysEC",
      "Content-Type": "application/json",
      accept: "application/json",
    },
  }),
  tagTypes: ["STOCK"],
  endpoints: (builder) => ({
    getStock: builder.query({
      query: currency => `/latest?symbols=${currency[1]}&base=${currency[0]}`,
      providesTags: ["STOCK"],
    }),
  }),
});

export const { useGetStockQuery } = stockApi;
