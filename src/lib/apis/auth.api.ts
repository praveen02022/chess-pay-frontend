import { api } from '@/lib/api';

/* ---------- REGISTER ---------- */
export const registerApi = async (payload: any) => {
  const { data } = await api.post('/auth/register', payload);
  return data; // { user, tokens }
};

/* ---------- EMAIL LOGIN ---------- */
export const loginWithEmailApi = async (payload: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post('/auth/login/email', payload);
  return data;
};

/* ---------- FIDE LOGIN ---------- */
export const loginWithFideApi = async (payload: {
  fideId: string;
  password: string;
}) => {
  const { data } = await api.post('/auth/login/fide', payload);
  return data;
};

/* ---------- MOBILE OTP ---------- */
export const sendOtpApi = async (payload: { mobile: string }) => {
  const { data } = await api.post('/auth/send-otp', payload);
  return data;
};

export const verifyOtpApi = async (payload: {
  mobile: string;
  otp: string;
}) => {
  const { data } = await api.post('/auth/verify', payload);
  return data;
};

/* ---------- ME ---------- */
export const meApi = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};

/* ---------- REFRESH TOKEN ---------- */
export const refreshTokenApi = async (payload: { refreshToken: string }) => {
  const { data } = await api.post('/auth/get-access-token', payload);
  return data;
};
