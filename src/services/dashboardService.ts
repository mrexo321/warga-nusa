import axios from "axios";
import axiosInstance from "../api/axiosInstance";

export const dashboardService = {
  // Ambil semua kursus
  async getAll() {
    const response = await axiosInstance.get("/dashboard");

    return response.data.data;
  },
};
