// export type TParamValue = string | string[] | number | number[] | boolean | undefined | null;

// export type TParams = Record<string, TParamValue>;

export type TParams = {
  titleSearch: string,
  categoryIdList: string[],
  exceptProductIdList: string[],
  isInStock: boolean | null,
  priceSort: "asc" | "desc" | null,
  paginationPage: number,
  paginationLimit: number | null,
  paginationItemsPerPage: number | null,
};


// const  s = <K extends keyof TSearchParams>(key: K, value: TSearchParams[K]) =>{
//  return true;
// }