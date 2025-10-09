import axios from "axios";
import axiosInstance from "../api/axiosInstance";

export const courseService = {
  // Ambil semua kursus
  async getAll() {
    const response = await axiosInstance.get("/course");

    return response.data.data;
  },

  // Ambil detail kursus
  async getById(id: string | number) {
    const response = await axiosInstance.get(`/course/${id}`);
    return response.data;
  },

  // Tambah kursus baru
  async create(payload: FormData) {
    const response = await axiosInstance.post("/course", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Update kursus
  async update(id: string | number, payload: FormData) {
    const response = await axiosInstance.put(`/course/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Hapus kursus
  async delete(id: string | number) {
    const response = await axiosInstance.delete(`/course/${id}`);
    return response.data;
  },

  async applyCourse(courseId: string) {
    const response = await axiosInstance.post(`/course/apply/${courseId}`);

    return response.data;
  },
};
