import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from 'api/config/axios';
import { DEFAULT_ERROR } from 'api/config/default-error';
import { TErrorResponseApi, TResponse } from 'api/types/types';
import { DETAILS_BASE_PARAMS } from 'api/config/detailsBaseParams';
import { makeSearchParamsString } from 'store/RootStore/utils/makeSearchParamsString';
import { TProductResponseApi } from 'store/models';
import { TParams } from 'store/RootStore/types/types';

export const getProductDetails = async <K extends keyof TParams>({
  documentId,
  route,
  searchParams,
}: {
  documentId: string;
  route: string;
  searchParams: Record<K, TParams[K]>;
}): Promise<TResponse<TProductResponseApi>> => {
  const searchString = makeSearchParamsString({ baseParams: DETAILS_BASE_PARAMS, extraParams: searchParams });

  try {
    const { data }: AxiosResponse<TProductResponseApi> = await axiosInstance.get(`${route}/${documentId}`, {
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
