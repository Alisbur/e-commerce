import { useEffect, useState } from "react"
import qs from 'qs';
import { useLocation } from "react-router";

export const useCurrentSearchParams = () => {
  const { pathname, search } = useLocation();
  const [searchString, setSearchString] = useState('');
  const [searchParams, setSearchParams] = useState({});

  useEffect(()=>{
    if(search !== undefined) {
      const searchStringVal = search.startsWith('?') ? search.slice(1) : search;
      setSearchString(searchStringVal);
      setSearchParams(qs.parse(searchStringVal));
    }
  }, [pathname, search]);

  return {sString: searchString, sParams: searchParams, pathname}
}