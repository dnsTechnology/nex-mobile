import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://nexcourier.com.np/api";
const localBaseUrl = "http://localhost:3000/api";
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: localBaseUrl }),
  endpoints: (builder) => ({
    testForNow: builder.query({
      query: () => "nex",
    }),
  }),
});
export const { useTestForNowQuery } = baseApi;
