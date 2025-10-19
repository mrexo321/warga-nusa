const API = "api";
const UPLOADS = "uploads";
const environment = {
  API_URL: import.meta.env.VITE_BACKEND_CSSL_BASE_URL + API,
  IMAGE_URL: import.meta.env.VITE_BACKEND_CSSL_BASE_URL,
};

export default environment;
