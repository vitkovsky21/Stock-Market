import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const initialState = {};

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.apilayer.com/exchangerates_data/latest?symbols=USD,RUB&base=USD`,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      apikey: "rmGNSQVltEZtGQCE1eKaBbMSBvk4ysEC"
    },
  }),
  tagTypes: ["STOCK"],
  endpoints: (builder) => ({
    getStock: builder.query<any, void>({
      query: () => "",
      providesTags: ["STOCK"],
    }),
  }),
});

export const { useGetStockQuery } = stockApi;
