import api from "../api";

export const register = async (nickname: string) => {
  const res = await api.post(`/auth/register?name=${nickname}`);
  return res.data;
};

export const login = async () => {
  const res = await api.post("/auth/login");
  return res.data;
};

export const getUserInfo = async () => {
  const res = await api.get("/auth/getUser");
  return res.data;
};
