export type TResponse<T> = {
  error: TErrorResponseApi | null;
  data: T | null;
};

export type TErrorResponseApi = {
  data?: unknown;
  error: {
    status: number;
    name: string;
    message: string;
    details: unknown;
  };
};
