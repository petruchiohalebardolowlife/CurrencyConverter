import { useEffect, useState } from "react";
import { ICurrency, IApiResponse } from "../models";
import axios, { AxiosError } from "axios";

export function useCurrencies() {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchCurrencies() {
    try {
      setError("");

      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        throw new Error("URL API не определён в переменных окружения");
      }
      const response = await axios.get<IApiResponse>(apiUrl);
      setCurrencies(Object.values(response.data.Valute));
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return { currencies, error, loading };
}
