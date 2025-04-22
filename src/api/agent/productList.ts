import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from 'api/config/axios';
import { DEFAULT_ERROR } from 'api/config/default-error';
import { TResponse } from 'api/types/types';
import { TErrorResponseApi } from 'api/types/types';
import { TProductListResponseApi } from 'store/models';
import { PRODUCT_LIST_BASE_PARAMS } from 'api/config/productListBaseParams';
import { makeSearchParamsString } from 'store/RootStore/utils/makeSearchParamsString';

export const getProductList = async ({
  route,
  searchParams,
}: {
  route: string;
  searchParams: Record<string, string | string[] | number | number[] | boolean | undefined | null>;
}): Promise<TResponse<TProductListResponseApi>> => {
  
  const searchString = makeSearchParamsString(PRODUCT_LIST_BASE_PARAMS, searchParams);

  try {
    const { data }: AxiosResponse<TProductListResponseApi> = await axiosInstance.get(route, {
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
