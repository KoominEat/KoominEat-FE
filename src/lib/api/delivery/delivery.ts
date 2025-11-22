import api from "../api";

export interface DeliveryRequest {
  deliveryId: number;
  status: "READY" | "PREPARING" | "FINISHED" | "CANCELLED";
  order: {
    orderId: number;
    status: "PREPARING" | "READY" | "COMPLETED" | "CANCELLED";
    totalPrice: number;
    orderItemResponses: {
      menuItemResponse: {
        image: string;
        menuId: number;
        name: string;
        price: number;
      };
      quantity: number;
    }[];
    orderType: "DELIVERY" | "PICKUP";
    storeResponse: {
      image: string;
      storeId: number;
      name: string;
      locationId: number;
      locationName: string;
      categoryId: number;
      categoryName: string;
      backgroundImage: string;
    };
    userResponse: {
      id: number;
      name: string;
    };
  };
  deliveryUser: {
    id: number;
    name: string;
  } | null;
  destination: string;
  message: string;
  estimatedTime: number;
  storeLocationId: number;
  storeLocationName: string;
}

export const getDeliveryRequests = async (): Promise<DeliveryRequest[]> => {
  const res = await api.get("/delivery/requests");
  return res.data.data;
};
