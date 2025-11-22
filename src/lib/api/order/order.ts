import api from "../api";

export interface OrderPayload {
  storeId: number;
  menus: {
    menuItemId: number;
    quantity: number;
  }[];
  orderType: "DELIVERY" | "PICKUP";
  destination?: string | null;
  message?: string | null;
}

export interface OrderItemResponse {
  menuItemResponse: {
    image: string;
    menuId: number;
    name: string;
    price: number;
  };
  quantity: number;
}

export interface OrderHistoryResponse {
  orderId: number;
  status: "PREPARING" | "READY" | "COMPLETED" | "CANCELLED";
  totalPrice: number;
  orderItemResponses: OrderItemResponse[];
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
}

export const postOrder = async (body: OrderPayload) => {
  const res = await api.post("/orders", body);
  return res.data;
};

export const getOrders = async () => {
  const res = await api.get("/orders");
  return res.data.data;
};
