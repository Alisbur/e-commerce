import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from 'api/config/axios';
import { TErrorResponse, TProductResponse } from 'entities/types/types';
import { API_ROUTES } from 'api/config/api-routes';
import { DEFAULT_ERROR } from 'api/config/default-error';

export const getProductDetails = async (documentId: string, searchParams: string): Promise<TProductResponse> => {
  try {
    const { data }: AxiosResponse<TProductResponse> = await axiosInstance.get<TProductResponse>(
      `${API_ROUTES.products}/${documentId}?${searchParams}`,
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
