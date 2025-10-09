import axiosInstance from "../api/axiosInstance";

export const galleryService = {
  // Ambil semua data galeri
  async getAll() {
    const response = await axiosInstance.get("/gallery");
    return response.data.data;
  },

  // Ambil detail galeri berdasarkan ID
  async getById(id: string | number) {
    const response = await axiosInstance.get(`/gallery/${id}`);
    return response.data;
  },

  // Tambah galeri baru
  async create(payload: FormData) {
    const response = await axiosInstance.post("/gallery", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Update galeri
  async update(id: string | number, payload: FormData) {
    const response = await axiosInstance.put(`/gallery/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Hapus galeri
  async delete(id: string | number) {
    const response = await axiosInstance.delete(`/gallery/${id}`);
    return response.data;
  },
};
