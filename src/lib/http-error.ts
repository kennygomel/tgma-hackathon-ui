import { AxiosError } from "axios";

export class HttpError extends Error {
  status?: number;
  data?: any;

  constructor(message: string, status?: number, data?: any) {
    super(message);

    this.status = status;
    this.data = data;
  }
}

export function toHttpError(e: unknown): HttpError {
  const ax = e as AxiosError;

  if (ax?.isAxiosError) {
    const msg = (ax.response?.data as any)?.message || ax.message || "Request error";
    return new HttpError(msg, ax.response?.status, ax.response?.data);
  }

  return new HttpError((e as any)?.message ?? "Unknown error");
}
