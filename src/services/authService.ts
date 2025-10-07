import axiosInstance from "../api/axiosInstance";
import { ILogin } from "../types/auth";

export const authService = {
  async login(payload: ILogin) {
    const response = await axiosInstance.post("/auth/login", payload);
    return response.data;
  },

  async logout() {
    const response = await axiosInstance.post("/logout");
    return response.data;
  },

  async getProfile() {
    const response = await axiosInstance.get("/me");
    return response.data;
  },
};
