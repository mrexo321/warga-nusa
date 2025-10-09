import axiosInstance from "../api/axiosInstance";

export const userService = {
  // Ambil semua user
  async getAll() {
    const response = await axiosInstance.get("/user");
    return response.data.data;
  },

  // Ambil user berdasarkan ID
  async getById(id: string | number) {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
  },

  // Tambah user baru
  async create(payload: FormData) {
    const response = await axiosInstance.post("/user", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Update user
  async update(id: string | number, payload: FormData) {
    const response = await axiosInstance.put(`/user/${id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Hapus user
  async delete(id: string | number) {
    const response = await axiosInstance.delete(`/user/${id}`);
    return response.data;
  },
};
