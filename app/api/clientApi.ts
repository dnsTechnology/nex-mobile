// try {
//     if (action === "dashboard") {
//       result = await handler();
//       console.log(result);
//     } else if (action === "trackingid") {
//       result = await handler();
//     } else if (action === "getallpaymentdetails") {
//       const data = await safeJson(req);
//       result = await handler(data?.page, data?.limit);
//     } else if (action === "acceptpayment") {
//       const data = await safeJson(req);
//       result = await handler(data?.id);
//     } else if (action === "rejectpayment") {
//       const data = await safeJson(req);
//       result = await handler(data?.id);
//     } else if (action === "toggle") {
//       result = await handler();
//     } else if (action === "isnotificationenabled") {
//       result = await handler();
//     } else if (action === "getlandmarks") {
//       const data = await safeJson(req);
//       result = await handler(data?.limit, data?.search);
//     } else if (action === "getshipmentbyid") {
//       //shipment_id required to get whole shipment information
//       const data = await safeJson(req);
//       result = await handler(data?.id);
//     } else if (action === "accounting") {
//       result = await handler();
//     } else if (action === "changepass") {
//       const data = await safeJson(req);
//       result = await handler(data?.oldPass, data?.newPass);
//     } else if (action === "createshipment") {
//       //data format
//       // {
//       //     "limit":2,
//       //     "search":"kath"
//       // }
//       const data = await safeJson(req);
//       result = await handler(
//         data?.formData,
//         data?.receiver,
//         data?.type // return, exchange, delivery, self_pickup , other
//       );
//     } else if (action === "discountinfo") {
//       //get discount before shipment create
//       result = await handler();
//     } else if (action === "accountingclient") {
//       const data = await safeJson(req);
//       result = await handler(
//         data?.id,
//         data?.date,
//         data?.limit,
//         data?.page,
//         data?.activeTab
//       );
//     } else if (action === "getshipmentswithdate") {
//       const data = await safeJson(req);
//       result = await handler(data?.id, data?.date, data?.active);
//     } else if (action === "getmyprofilebyid") {
//       const data = await safeJson(req);
//       result = await handler(data?.id);
//     } else if (action === "getmyprofile") {
//       result = await handler();
//     } else if (action === "active") {
//       const data = await safeJson(req);
//       result = await handler(data?.limit, data?.page);
//     }

//     //        uploadqr: uploadQrCode,
//     // getqrcode: getPaymentQR,
//     // deleteqr: deleteQrCode,
//     else if (action === "uploadqr") {
//       const data = await safeJson(req);
//       result = await handler(data?.QrCode);
//     } else if (action === "getqrcode") {
//       result = await handler();
//     } else if (action === "deleteqr") {
//       result = await handler();
//     } else if (action === "clientLogouthandle") {
//       // const data = await safeJson(req);
//       result = await handler();
//     } else {
//       result = await handler();
//     }
//   }
import { baseApi } from "./base";
export const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashboard: builder.mutation({
      query: () => ({
        url: "/nex/client/dashboard",
        method: "POST",
        body: {},
      }),
    }),
  }),
});

export const { useDashboardMutation } = clientApi;
