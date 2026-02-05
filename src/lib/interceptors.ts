import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import useAuthStore from '@/store/auth-store';

/* ================= REQUEST ================= */
export const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { token } = useAuthStore.getState();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

/* ================= SUCCESS ================= */
export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

/* ================= ERROR ================= */
export const errorInterceptor = (error: AxiosError) => {
  // 401 → let caller (React Query / app) handle it
  if (error.response?.status === 401) {
    return Promise.reject(error);
  }

  // Helpful console logging for dev
  // Helpful console logging for dev
  /* if (error.response) {
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
  } else if (error.request) {
      console.error('Request:', error.request);
  } else {
      console.error('Error:', error.message);
  } */

  // ✅ THIS IS CRITICAL
  return Promise.reject(error);
};
