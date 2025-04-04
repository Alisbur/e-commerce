import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from 'api/config/axios';
import { API_ROUTES } from 'api/config/api-routes';
import { DEFAULT_ERROR } from 'api/config/default-error';
import { TErrorResponseApi, TResponse } from 'api/types/types';

export const getProductDetails = async <T>({
  documentId,
  searchParams,
}: {
  documentId: string;
  searchParams: string;
}): Promise<TResponse<T>> => {
  try {
    const { data }: AxiosResponse<T> = await axiosInstance.get<T>(`${API_ROUTES.products}/${documentId}`, {
      params: { s: searchParams },
      paramsSerializer: ({ s }) => s,
    });
    return { data, error: null };
  } catch (e: unknown) {
    if (e instanceof AxiosError && e.response !== undefined) {
      const error: TErrorResponseApi = e.response.data as TErrorResponseApi;
      return { error, data: null };
    }
    return {
      error: { error: DEFAULT_ERROR },
      data: null,
    };
  }
};
