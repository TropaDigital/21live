import { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useToast } from "./toast";

interface PaginationProps {
  currentPage: number;
  from: number;
  lastPage: number;
  perPage: number;
  to: number;
  total: number;
}

export function useFetch<T = unknown>(url: string, options?: AxiosRequestConfig) {
  const { addToast } = useToast();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [pages, setPages] = useState<PaginationProps>({
    currentPage: 0,
    perPage: 0,
    total: 0,
    from: 0,
    lastPage: 0,
    to: 0
  } as PaginationProps);

  const fetchData = async () => {
    api.get(url, options).then(response => {
      setData(response.data.result);  

      if(response.data.pagination) {
        setPages(response.data.pagination)
      }
    })
    .catch(err => {
      setError(err);

      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: err.response.data.message,
      });
    })
    .finally(() => {
      setIsFetching(false);
    })
  };

    useEffect(() => {
      fetchData();
    }, [url]);
  
  return { data, pages, error, isFetching, fetchData }
}