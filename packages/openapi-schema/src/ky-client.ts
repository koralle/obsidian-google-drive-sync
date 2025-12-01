import ky from "ky";
import { match } from "ts-pattern";

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const baseURL = "<BACKEND URL>";

interface APIClientOptions extends RequestInit {
  method: HTTPMethod;
  params?: string[][] | Record<string, string> | string | URLSearchParams;
}

export const apiClient = async <T>(
  url: string,
  { method, params, body = null, headers = [] }: APIClientOptions,
): Promise<T> => {
  let targetURL = `${baseURL}/${url}`;

  if (params) {
    targetURL += `?${new URLSearchParams(params)}`;
  }

  const apiClientBase = ky.extend({ retry: { jitter: true } });

  const response = match(method)
    .with("GET", async () => await apiClientBase.get(targetURL, { body, headers }).json<T>())
    .with("POST", async () => await apiClientBase.post(targetURL, { body, headers }).json<T>())
    .with("PUT", async () => await apiClientBase.put(targetURL, { body, headers }).json<T>())
    .with("DELETE", async () => apiClientBase.delete(targetURL, { body, headers }).json<T>())
    .with("PATCH", async () => ky.patch(targetURL, { body, headers }).json<T>())
    .exhaustive();

  return response;
};

export default apiClient;
