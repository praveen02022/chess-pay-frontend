import {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { getItem } from './local-storage';

export interface ConsoleError {
  status: number;
  data: unknown;
}

export const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getItem<string>('token');
  console.log("🧪 RAW TOKEN:", token);
  console.log("FINAL AUTH HEADER:", config.headers.Authorization);

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  console.log(
    "🧪 FINAL AUTH HEADER:",
    config.headers.get("Authorization")
  );

  return config;
};
// export const requestInterceptor = (config: any) => {
//   const devToken = import.meta.env.VITE_DEV_ORGANIZER_TOKEN;

//   if (devToken) {
//     config.headers.Authorization = `Bearer ${devToken}`;
//   }

//   return config;
// };

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};



export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  if (error.response?.status === 401) {
    await Promise.reject(error);
  } else {
    if (error.response) {
      const errorMessage: ConsoleError = {
        status: error.response.status,
        data: error.response.data,
      };
      console.error(errorMessage);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    await Promise.reject(error);
  }
};
