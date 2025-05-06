import { TErrorResponseApi } from 'api/types/types';

export type TErrorResponseModel = {
  error: {
    status: number;
    name: string;
    message: string;
    details: unknown;
  };
};

export const normalizeError = (from: TErrorResponseApi): TErrorResponseModel => ({
  error: {
    status: from.error.status,
    name: from.error.name,
    message: from.error.message,
    details: from.error.details,
  },
});
