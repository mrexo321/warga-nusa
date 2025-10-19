import axiosInstance from "../api/axiosInstance";

interface shiftData {
  userId: string;
  shiftId: string;
  date: string;
}

export const shiftService = {
  // Ambil semua Shift
  async getAll() {
    const response = await axiosInstance.get("/shift");
    return response.data.data;
  },

  async applyShift(data: shiftData) {
    const response = await axiosInstance.post("/user/apply-shift", data);
    return response.data;
  },

  async getUserShift(year, month) {
    const response = await axiosInstance.get(
      `/user-shifts?year=${year}&month=${month}`
    );
    return response.data;
  },
};
