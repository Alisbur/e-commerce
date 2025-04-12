import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from 'api/config/axios';
import { DEFAULT_ERROR } from 'api/config/default-error';
import { TResponse } from 'api/types/types';
import { TErrorResponseApi } from 'api/types/types';
import { TProductCategoriesResponseApi } from 'store/models';

export const getCategoryList = async({
  route,
  searchParams,
}: {
  route: string;
  searchParams: string;
}): Promise<TResponse<TProductCategoriesResponseApi>> => {
  try {
    const { data }: AxiosResponse<TProductCategoriesResponseApi> = await axiosInstance.get(route, {
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
