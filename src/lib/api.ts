import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true,
});


let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;
let requestQueue: ((tokenOk: boolean) => void)[] = [];

async function refreshSession() {
  return api.post('/auth/refresh', null);
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const { config, response } = error;
    const original = config as AxiosRequestConfig & { _retry?: boolean };

    if (!response) throw error;

    if (response.status === 401 && !original._retry) {
      original._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshSession()
          .then(() => {
            requestQueue.forEach(fn => fn(true));
          })
          .catch(() => {
            requestQueue.forEach(fn => fn(false));
          })
          .finally(() => {
            requestQueue = [];
            isRefreshing = false;
            refreshPromise = null;
          });
      }

      return new Promise((resolve, reject) => {
        requestQueue.push((ok) => {
          if (!ok) return reject(error);

          resolve(api(original));
        });
      });
    }

    throw error;
  }
);

export { api };
