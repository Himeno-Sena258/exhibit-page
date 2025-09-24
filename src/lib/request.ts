import useAuthStore from '@/stores/auth-store';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
const API_BASE_URL = '/api/v1';

const request = (config: AxiosRequestConfig) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
    withCredentials: false,
  });
  instance.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${useAuthStore.getState().accessToken}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {

      if (error.response) {

        if (error.response.status === 401 || error.response.status === 403) {
          useAuthStore.getState().setAccessToken(null);
          useAuthStore.getState().setIsAuthenticated(false);
        }
        return Promise.reject(
          error.response.data?.detail ||
            error.response.data ||
            'An error occurred'
        );
      }
      return Promise.reject(error.message || 'Network error');
    }
  );
  return instance(config);
};

export default request;
