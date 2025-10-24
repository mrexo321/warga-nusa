import axiosInstance from "../api/axiosInstance";

export const attendanceService = {
  // Ambil semua data absensi
  async getAll() {
    const response = await axiosInstance.get("/attendance");
    return response.data.data;
  },

  // Ambil detail absensi berdasarkan ID
  async getById(id: string | number) {
    const response = await axiosInstance.get(`/attendance/${id}`);
    return response.data;
  },

  // Tambah data absensi (hanya kirim gambar)
  async markAttendance(image: File) {
    const formData = new FormData();
    formData.append("image", image);

    const response = await axiosInstance.post("/attendance", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Update absensi
  async update(id: string | number, payload: FormData) {
    const response = await axiosInstance.put(`/attendance/${id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Hapus absensi
  async delete(id: string | number) {
    const response = await axiosInstance.delete(`/attendance/${id}`);
    return response.data;
  },

  async todayAttendance(date: string) {
    const response = await axiosInstance.get(`/attendance/daily?date=${date}`);
    return response.data;
  },
};
