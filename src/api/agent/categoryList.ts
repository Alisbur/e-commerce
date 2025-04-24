import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from 'api/config/axios';
import { DEFAULT_ERROR } from 'api/config/default-error';
import { TResponse } from 'api/types/types';
import { TErrorResponseApi } from 'api/types/types';
import { TProductCategoriesResponseApi } from 'store/models';
import { TParams } from 'store/RootStore/types/types';
import { CATEGORIES_LIST_BASE_PARAMS } from 'api/config/categoryListBaseParams';
import { makeSearchParamsString } from 'store/RootStore/utils/makeSearchParamsString';

export const getCategoryList = async <K extends keyof TParams>({
  route,
  searchParams,
}: {
  route: string;
  searchParams: Record<K, TParams[K]>;
}): Promise<TResponse<TProductCategoriesResponseApi>> => {
  const searchString = makeSearchParamsString({ baseParams: CATEGORIES_LIST_BASE_PARAMS, extraParams: searchParams });

  try {
    const { data }: AxiosResponse<TProductCategoriesResponseApi> = await axiosInstance.get(route, {
      params: { s: searchString },
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
