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
    const response = await axiosInstance.post("/user/assign-shift", data);
    return response.data;
  },

  async getUserShift(year: any, month: any) {
    const response = await axiosInstance.get(
      `/user-shifts?year=${year}&month=${month}`
    );
    return response.data;
  },

  async createShift(payload: {
    name: string;
    checkOut: string;
    checkIn: string;
  }) {
    const response = await axiosInstance.post(`/shift`, payload);

    return response.data;
  },

  async updateShift(
    shiftId: string,
    payload: { name: string; checkIn: string; checkOut: string }
  ) {
    const response = await axiosInstance.put(`/shift/${shiftId}`, payload);
    return response.data;
  },

  async deleteShift(shiftId: string) {
    const response = await axiosInstance.delete(`/shift/${shiftId}`);
    return response.data;
  },

  async unassignShift(payload: { date: string; userId: string }) {
    const response = await axiosInstance.post("/user/unassign-shift", payload);
    return response.data;
  },
};
