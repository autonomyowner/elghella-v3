import API from "../config/apiClient";
import { User } from "../context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:7000";

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  telephone?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ResetPasswordData {
  verificationCode: string;
  password: string;
}

export const register = async (data: RegisterData) =>
  API.post(`${BASE_URL}/auth/register`, data);

export const login = async (data: LoginData) =>
  API.post(`${BASE_URL}/auth/login`, data);

export const logout = async () => API.get(`${BASE_URL}/auth/logout`);

export const verifyEmail = async (verificationCode: string) =>
  API.get(`${BASE_URL}/auth/email/verify/${verificationCode}`);

export const sendPasswordResetEmail = async (email: string) =>
  API.post(`${BASE_URL}/auth/password/forgot`, { email });

export const resetPassword = async ({
  verificationCode,
  password,
}: ResetPasswordData) =>
  API.post(`${BASE_URL}/auth/password/reset`, { verificationCode, password });

export const getUser = async (): Promise<{
  name: string;
  email: string;
  telephone: string | undefined;
  verified: boolean;
  userId: string | undefined;
  data: User;
}> => API.get(`${BASE_URL}/myuser`);

export const getSessions = async () => API.get(`${BASE_URL}/sessions`);

export const deleteSession = async (id: string) =>
  API.delete(`${BASE_URL}/sessions/${id}`);

export const refreshToken = async () => API.get(`${BASE_URL}/auth/refresh`);
