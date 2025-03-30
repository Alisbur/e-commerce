import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from 'api/config/axios';
import { TErrorResponse, TProductListResponse } from 'entities/types/types';
import { API_ROUTES } from 'api/config/api-routes';
import { DEFAULT_ERROR } from 'api/config/default-error';

export const getProductList = async (query: string = ''): Promise<TProductListResponse> => {
  try {
    const { data }: AxiosResponse<TProductListResponse> = await axiosInstance.get<TProductListResponse>(
      `${API_ROUTES.products}${query ? '?' + query : ''}`,
    );
    return data;
  } catch (e: unknown) {
    if (e instanceof AxiosError && e.response !== undefined) {
      const { error }: TErrorResponse = e.response.data as TErrorResponse;
      const errorMessage = `${error.status} ${error.name}. ${error.message}.`;
      throw new Error(errorMessage);
    } else {
      throw new Error(DEFAULT_ERROR);
    }
  }
};
