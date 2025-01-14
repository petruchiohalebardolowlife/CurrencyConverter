import { useState, useEffect, useMemo } from "react";
import { SelectOption } from "./models";
import Select from "react-select";
import "./index.css";
import { useCurrencies } from "./hooks/useCurrencies";
import { Input } from "./components/Input";
import Layout from "./components/Layout";

function App() {
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] =
    useState<SelectOption | null>(null);
  const [selectedCurrencyTo, setSelectedCurrencyTo] =
    useState<SelectOption | null>(null);
  const [inputFromValue, setInputFromValue] = useState<string>("");
  const [inputToValue, setInputToValue] = useState<string>("");
  const { currencies, error, loading } = useCurrencies();

  const options = useMemo(
    () =>
      currencies.map((currency) => ({
        value: currency.CharCode,
        label: currency.Name,
        nominal: currency.Nominal,
        valueInCurrency: currency.Value,
      })),
    [currencies]
  );

  const converter = (
    value: string,
    setInputValue: (value: string) => void,
    selectedCurrencyFrom: SelectOption | null,
    selectedCurrencyTo: SelectOption | null,
    setOtherInputValue: (value: string) => void
  ) => {
    setInputValue(value);
    if (selectedCurrencyFrom && selectedCurrencyTo) {
      const convertedValue =
        (parseFloat(value) *
          (selectedCurrencyFrom.valueInCurrency /
            selectedCurrencyFrom.nominal)) /
        (selectedCurrencyTo.valueInCurrency / selectedCurrencyTo.nominal);

      setOtherInputValue(
        isNaN(convertedValue) ? "" : convertedValue.toFixed(2)
      );
    }
  };

  const swapCurrencies = () => {
    setSelectedCurrencyFrom(selectedCurrencyTo);
    setSelectedCurrencyTo(selectedCurrencyFrom);
    setInputFromValue(inputToValue);
    setInputToValue(inputFromValue);
  };

  useEffect(() => {
    if (selectedCurrencyFrom && selectedCurrencyTo) {
      converter(
        inputFromValue,
        setInputFromValue,
        selectedCurrencyFrom,
        selectedCurrencyTo,
        setInputToValue
      );
    }
  }, [selectedCurrencyFrom, selectedCurrencyTo]);

  if (loading) return <Layout header="Загрузка..." />;
  if (error) return <Layout header="Ошибка" />;
  return (
    <Layout header="Конвертер валют">
      <div>
        <div className="flex justify-center w-full space-x-4 py-5">
          <div className="relative w-full max-w-[600px]">
            <span className="absolute left-[-180px] top-1/2 transform -translate-y-1/2 font-bold text-lg text-gray-700 mr-2">
              Вы переводите из
            </span>
            <Select
              options={options}
              value={selectedCurrencyFrom}
              onChange={(selectedCurrencyFrom) =>
                setSelectedCurrencyFrom(selectedCurrencyFrom)
              }
              className="text-lg text-center font-bold"
              placeholder="Выберите валюту"
            />
          </div>
          <span className="top-1/2 font-bold text-lg text-gray-700 mr-2 mt-[5px]">
            в
          </span>
          <div className="w-full max-w-[600px]">
            <Select
              options={options}
              value={selectedCurrencyTo}
              onChange={(selectedCurrencyTo) =>
                setSelectedCurrencyTo(selectedCurrencyTo)
              }
              className="text-lg text-center font-bold"
              placeholder="Выберите валюту"
            />
          </div>
        </div>
        <div className="flex justify-center w-full space-x-4 py-5">
          <div className="relative w-full max-w-[600px]">
            <Input
              inputValue={inputFromValue}
              onChangeFunction={(value) =>
                converter(
                  value,
                  setInputFromValue,
                  selectedCurrencyFrom,
                  selectedCurrencyTo,
                  setInputToValue
                )
              }
            />
          </div>
          <div className="w-full max-w-[600px]">
            <Input
              inputValue={inputToValue}
              onChangeFunction={(value) =>
                converter(
                  value,
                  setInputToValue,
                  selectedCurrencyTo,
                  selectedCurrencyFrom,
                  setInputFromValue
                )
              }
            />
          </div>
        </div>
        <div className="flex justify-center py-5">
          <button
            className="hover:bg-sky-200 hover:underline"
            onClick={swapCurrencies}
          >
            Поменять местами
          </button>
        </div>
      </div>
    </Layout>
  );
}
export default App;
