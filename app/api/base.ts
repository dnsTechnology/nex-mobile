// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // const baseUrl = "https://nexcourier.com.np/api";
// const localBaseUrl = "http://192.168.200.178:3000/api";
// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({ baseUrl: localBaseUrl }),
//   endpoints: (builder) => ({
//     testForNow: builder.query({
//       query: () => "nex",
//     }),
//   }),
// });
// export const { useTestForNowQuery } = baseApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tokenManager } from "../utils/tokenManager";
const localBaseUrl = "http://192.168.200.178:3000/api";

// Function to get token from SecureStore
const getTokenFromSecureStore = async () => {
  try {
    const token = await tokenManager.getAccessToken();
    return token;
  } catch (error) {
    console.log("Error getting token:", error);
    return null;
  }
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: localBaseUrl,
    // This adds token automatically to headers
    prepareHeaders: async (headers) => {
      const token = await getTokenFromSecureStore();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    testForNow: builder.query({
      query: () => "nex",
    }),
  }),
});

export const { useTestForNowQuery } = baseApi;
