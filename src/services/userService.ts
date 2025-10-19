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
  async create(payload: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) {
    const response = await axiosInstance.post("/user", payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  },

  // Update user
  async update(
    userId: string,
    payload: {
      name?: string;
      email?: string;
    }
  ) {
    const response = await axiosInstance.put(`/user/${userId}`, payload);
    return response.data;
  },

  // Hapus user
  async delete(id: string | number) {
    const response = await axiosInstance.delete(`/user/${id}`);
    return response.data;
  },
};
