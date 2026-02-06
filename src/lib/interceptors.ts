import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import useAuthStore from '@/store/auth-store';
import { api } from './api';
import authStore from '@/store/auth-store';

/* ================= REQUEST ================= */
export const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  return config;
};

/* ================= SUCCESS ================= */
export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

/* ================= ERROR ================= */
let isRefreshing = false;
let queue: any[] = [];

export const errorInterceptor = async (error: any) => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    isRefreshing = true;

    try {
      await api.post('/auth/refresh'); // 🔁 uses refresh cookie
      queue.forEach((p) => p.resolve());
      queue = [];
      return api(originalRequest);
    } catch (err) {
      queue.forEach((p) => p.reject(err));
      queue = [];
      useAuthStore.getState().logout();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
  if (error.response?.status === 401) {
    authStore.getState().logout();
  }

  return Promise.reject(error);
};
