import { makeSearchParams } from './makeSearchParams';
import { QUERY_PARAMS_CONVERT_RULES } from '../config';
import { QUERY_PARAMS_VALIDATION_RULES } from '../config';
import { TValue } from '../types/types';

export const makeSearchParamsString = (
  baseParams: Record<string, string[]>,
  extraParams: Record<string, TValue> = {},
) => {
  const baseParamsSearchString = makeSearchParams({ searchConfig: baseParams });
  const extraParamsSearchStringArray: string[] = [];
  for (const [key, value] of Object.entries(extraParams)) {
    console.log("KEY =", key, "value =", value, "VALID =", QUERY_PARAMS_VALIDATION_RULES[key])
    if (QUERY_PARAMS_VALIDATION_RULES[key](value as TValue)) {
      extraParamsSearchStringArray.push(makeSearchParams({ searchConfig: QUERY_PARAMS_CONVERT_RULES[key](value as TValue) }));
    }
  }

  console.log(extraParamsSearchStringArray)

  return extraParamsSearchStringArray.length
    ? baseParamsSearchString + '&' + extraParamsSearchStringArray.join('&')
    : baseParamsSearchString;
};
