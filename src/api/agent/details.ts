import axios, { AxiosError, AxiosResponse } from 'axios';
import { TErrorResponse, TProductResponse } from 'entities/types/types';
import { API_ROUTES } from 'config/api-routes';
import { JWT } from 'api/constants/jwt';
import { DEFAULT_ERROR } from 'api/constants/default-error';

export const getProductDetails = async (documentId: string, searchParams: string): Promise<TProductResponse> => {
  try {
    const { data }: AxiosResponse<TProductResponse> = await axios.get<TProductResponse>(
      `${API_ROUTES.products}/${documentId}?${searchParams}`,
      {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      },
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
