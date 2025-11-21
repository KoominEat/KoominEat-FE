import api from "../api";

export const getStores = async (categoryId?: number, locationId?: number) => {
  const params = new URLSearchParams();

  if (categoryId) params.append("categoryId", String(categoryId));
  if (locationId) params.append("locationId", String(locationId));

  const query = params.toString();
  const res = await api.get(`/stores${query ? `?${query}` : ""}`);
  return res.data.data;
};

export const getStoreDetail = async (storeId: number) => {
  const res = await api.get(`/stores/${storeId}/menu-items`);
  return res.data.data;
};
