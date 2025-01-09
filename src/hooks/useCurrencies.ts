import { useEffect, useState } from "react";
import { ICurrency, IApiResponse } from "../models";
import axios, { AxiosError } from "axios";

export function useCurrencies() {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  //const [keys, setKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchCurrencies() {
    try {
      setError("");
      //setLoading(true);
      console.log("Запрос...");
      const response = await axios.get<IApiResponse>(
        "https://www.cbr-xml-daily.ru/daily_json.js"
      );

      const Ruble: ICurrency = {
        ID: "R01R01",
        NumCode: 999,
        CharCode: "RUB",
        Nominal: 1,
        Name: "Рубли",
        Value: 1,
        Previous: 1,
      };
      setCurrencies([Ruble, ...Object.values(response.data.Valute)]);
      //setKeys(Object.keys(response.data.Valute))
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
