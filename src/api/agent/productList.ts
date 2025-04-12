import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from 'api/config/axios';
import { DEFAULT_ERROR } from 'api/config/default-error';
import { TResponse } from 'api/types/types';
import { TErrorResponseApi } from 'api/types/types';
import { TProductListResponseApi } from 'store/models';

export const getProductList = async({
  route,
  searchParams,
}: {
  route: string;
  searchParams: string;
}): Promise<TResponse<TProductListResponseApi>> => {
  try {
    const { data }: AxiosResponse<TProductListResponseApi> = await axiosInstance.get(route, {
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
