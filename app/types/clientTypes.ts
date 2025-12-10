interface Value {
  count: number;
}
export interface ClientDashboard {
  activePendingShipments: Value[];
  allShipments: Value[];
  canceledShipments: Value[];
  createdAllShipments: Value[];
  deliveredNotVerified: Value[];
  deliveredShipments: Value[];
  requestedForExchangeShipments: Value[];
  requestedForReturnShipments: Value[];
  todayPickedShipment: Value[];
  todaysEnteredShipments: Value[];
  weeklyShipments: Value[];
}

interface SchemeI {
  discountName: string;
  type: "percentage" | "amount";
  value: number;
  isActive: boolean;
}

export interface IClient {
  name: string;
  companyName: string;
  companyEmail: string; /// panCard, companyEmail, companyName , telephone
  telephone: string;
  mobile: string;
  profile: string;
  profession: string;
  email: string;
  address: string;
  country: string;
  province: string;
  district: string;
  landmark: string;
  postalCode: string;
  panCard: string;
  panNumber: string;
  hasDiscount: boolean;
  scheme: SchemeI;
  password: string;
  isClient: boolean;
  forgotpass_token: string;
  forgotpass_expiry: Date;
  resetpass_token: string;
  resetpass_expiry: Date;
  isVerified: boolean;
  verification: string;
  domain: string;
  connection: string;
  notification: boolean;
  QRcode: string;
  tokenDetail: {
    token: string;
    expiry: Date;
  };
}

export interface Location {
  _id: string;
  name: string;
  shippingPrice: number;
  shippingPriceSelfPickup: number;
  district: {
    _id: string;
    name: string;
  };
  province: {
    _id: string;
    name: string;
  };
  country: {
    _id: string;
    name: string;
    code: string;
  };
}
