import { baseApi } from "./base";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerClient: builder.mutation({
      query: (credentials) => ({
        url: "/admin/client",
        method: "POST",
        body: credentials,
      }),
    }),
    loginClient: builder.mutation({
      query: (credentials) => ({
        url: "/client/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logoutClient: builder.mutation({
      query: () => ({
        url: "/nex/client/clientLogouthandle",
        method: "POST",
        body: {},
      }),
    }),
    registerDelivery: builder.mutation({
      query: (credentials) => ({
        url: "/auth/user/register",
        method: "POST",
        body: credentials,
      }),
    }),
    loginDelivery: builder.mutation({
      query: (credentials) => ({
        url: "/delivery/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutDelivery: builder.mutation({
      query: () => ({
        url: "/nex/delivery/deliveryLogouthandle",
        method: "POST",
        body: {},
      }),
    }),
  }),
});

export const {
  useRegisterClientMutation,
  useLoginClientMutation,
  useLogoutClientMutation,
  useRegisterDeliveryMutation,
  useLoginDeliveryMutation,
  useLogoutDeliveryMutation,
} = authApi;
