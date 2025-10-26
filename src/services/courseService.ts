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
    return response.data.data;
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

  async createCourseMeeting(
    courseId: string,
    payload: {
      title: string;
      mode: string;
      latitude: string;
      longitude: string;
    }
  ) {
    const response = await axiosInstance.post(
      `/course/${courseId}/meetings`,
      payload
    );
    return response.data;
  },

  async addCourseMaterials(courseId: string, data: FormData) {
    const response = await axiosInstance.post(
      `/course/${courseId}/materials`,
      data
    );
    return response.data;
  },

  async getMeetingDetail(courseId: string, meetingId: string) {
    const response = await axiosInstance.get(
      `/course/${courseId}/meetings/${meetingId}`
    );

    return response.data.data;
  },

  async submitAttendance(
    courseId: string,
    payload: {
      code: string;
      longitude: string;
      latitude: string;
    }
  ) {
    const response = await axiosInstance.post(
      `/course/${courseId}/meetings/attend`,
      payload
    );
    return response.data;
  },

  async getTakenCourse() {
    const response = await axiosInstance.get(`/course/taken-course`);
    return response.data.data;
  },

  async deleteCourseMaterial(courseId: string, materialId: string) {
    const response = await axiosInstance.delete(
      `/course/${courseId}/materials/${materialId}`
    );
  },
};
