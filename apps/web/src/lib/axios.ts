import axios, { type AxiosRequestConfig, Method, type AxiosError } from 'axios';

export const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  withCredentials: true,
});

AXIOS_INSTANCE.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        if (!currentPath.startsWith('/auth')) {
          window.location.href = '/auth/sign-in';
        }
      }
    }
    return Promise.reject(error);
  }
);

type CancellablePromise<T> = Promise<T> & {
  cancel: () => void;
};

export const convertHeaders = (headers?: HeadersInit): Record<string, string> | undefined => {
  if (!headers) return undefined;
  
  if (headers instanceof Headers) {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
  
  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }
  
  return headers as Record<string, string>;
};

export const convertRequestInitToAxiosConfig = (
  url: string,
  options?: RequestInit
): AxiosRequestConfig => {
  const config: AxiosRequestConfig = {
    url,
    method: options?.method as Method,
    headers: convertHeaders(options?.headers),
    signal: options?.signal || undefined,
  };

  if (options?.body) {
    if (typeof options.body === 'string') {
      try {
        config.data = JSON.parse(options.body);
      } catch {
        config.data = options.body;
      }
    } else {
      config.data = options.body;
    }
  }

  return config;
};

export const customInstance = <T>(
  url: string,
  options?: RequestInit,
): CancellablePromise<T> => {
  const config = convertRequestInitToAxiosConfig(url, options);
  const source = axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    (response) => {
      // Convert AxiosResponseHeaders to standard Headers object
      const headers = new Headers();
      Object.entries(response.headers).forEach(([key, value]) => {
        if (value !== undefined) {
          headers.set(key, Array.isArray(value) ? value.join(', ') : String(value));
        }
      });

      return {
        data: response.data,
        status: response.status,
        headers,
      } as T;
    },
  ) as CancellablePromise<T>;

  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

