import api from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
      const response = await api.post("/auth/login", data);
      return response.data;
  },

  async signup(data: SignupRequest): Promise<AuthResponse> {
      const response = await api.post("/auth/signup", data);
      return response.data;
  },
};