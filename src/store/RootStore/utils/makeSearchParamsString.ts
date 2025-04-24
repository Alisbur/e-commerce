import { makeSearchParams } from './makeSearchParams';
import { QUERY_PARAMS_CONVERT_RULES } from '../config';
import { QUERY_PARAMS_VALIDATION_RULES } from '../config';
import { TParams } from '../types/types';

export const makeSearchParamsString = <K extends keyof TParams>({ 
  baseParams, 
  extraParams 
}: {
  baseParams: Record<string, string[]>;
  extraParams?: Record<K, TParams[K]>;
}) => {
  const baseParamsSearchString = makeSearchParams({ searchConfig: baseParams });
  const extraParamsSearchStringArray: string[] = [];
  if (extraParams) {
    for (const [key, value] of Object.entries(extraParams) as [K, TParams[K]][]) {
      if (
        Object.keys(QUERY_PARAMS_VALIDATION_RULES).includes(key) &&
        Object.keys(QUERY_PARAMS_CONVERT_RULES).includes(key) &&
        QUERY_PARAMS_VALIDATION_RULES[key](value as TParams[K])
      ) {
        extraParamsSearchStringArray.push(
          makeSearchParams({ searchConfig: QUERY_PARAMS_CONVERT_RULES[key](value as TParams[K]) }),
        );
      }
    }
  }

  return extraParamsSearchStringArray.length
    ? baseParamsSearchString + '&' + extraParamsSearchStringArray.join('&')
    : baseParamsSearchString;
};
