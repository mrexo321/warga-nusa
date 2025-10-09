import axiosInstance from "../api/axiosInstance";

export const newsService = {
  // Ambil semua berita
  async getAll() {
    const response = await axiosInstance.get("/news");
    return response.data.data;
  },

  // Ambil detail berita berdasarkan ID
  async getById(id: string | number) {
    const response = await axiosInstance.get(`/news/${id}`);
    return response.data;
  },

  // Tambah berita baru
  async create(payload: FormData) {
    // Pastikan payload sudah berisi title, content, author_id, dan thumbnail
    const response = await axiosInstance.post("/news", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Update berita
  async update(id: string | number, payload: FormData) {
    // Sama seperti create, tapi method PUT
    const response = await axiosInstance.put(`/news/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Hapus berita
  async delete(id: string | number) {
    const response = await axiosInstance.delete(`/news/${id}`);
    return response.data;
  },
};
