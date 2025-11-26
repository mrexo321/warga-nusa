import axiosInstance from "../api/axiosInstance";

export const patrolService = {
  // Ambil semua berita
  async getAll() {
    const response = await axiosInstance.get("/patrol");
    return response.data.data;
  },

  async log() {
    const response = await axiosInstance.get("/patrol/logs");
    return response.data.data;
  },

  // Ambil detail berita berdasarkan ID
  async getById(id: string | number) {
    const response = await axiosInstance.get(`/patrol/${id}`);
    return response.data.data;
  },

  // Tambah berita baru
  //   async create(payload: FormData) {
  //     // Pastikan payload sudah berisi title, content, author_id, dan thumbnail
  //     const response = await axiosInstance.post("/news", payload, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     return response.data;
  //   },

  async addRoute(
    id: string,
    payload: {
      name: string;
      latitude: string | number;
      longitude: string | number;
    }
  ) {
    const response = await axiosInstance.post(`/patrol/${id}/route`, payload);
    return response.data;
  },

  async create(data: { name: string }) {
    const response = await axiosInstance.post(`/patrol/`, data);
    return response.data;
  },

  async scan(formData: FormData) {
    return await axiosInstance.post("/patrol/scan", formData);
  },

  async updateRoute(patrolId: string, routeId: string, payload: any) {
    const { name, latitude, longitude } = payload;
    const response = await axiosInstance.put(
      `/patrol/${patrolId}/route/${routeId}`,
      { name, latitude, longitude }
    );
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

  //   Delete Patrol

  async deletePatrol(patrolId: string) {
    const response = await axiosInstance.delete(`/patrol/${patrolId}`);
    return response.data;
  },

  // Hapus berita
  async delete(id: string | number) {
    const response = await axiosInstance.delete(`/news/${id}`);
    return response.data;
  },
};
