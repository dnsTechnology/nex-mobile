import { baseApi } from "./base";

export const deliveryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDelivery: builder.query({
      query: () => "/delivery",
    }),
  }),
});

export const { useGetDeliveryQuery } = deliveryApi;
