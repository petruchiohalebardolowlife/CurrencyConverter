import { useState, useEffect } from "react";
import { SelectCurrency } from "./components/SelectCurrency";
import { SelectOption } from "./models";
import "./index.css";
import { useCurrencies } from "./hooks/useCurrencies";
import { Input } from "./components/Input";

function App() {
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] =
    useState<SelectOption | null>(null);
  const [selectedCurrencyTo, setSelectedCurrencyTo] =
    useState<SelectOption | null>(null);
  const [inputFromValue, setInputFromValue] = useState<string>("");
  const [inputToValue, setInputToValue] = useState<string>("");
  const { loading, error } = useCurrencies();

  const converter = (
    value: string,
    selectedCurrencyFrom: SelectOption | null,
    selectedCurrencyTo: SelectOption | null,
    setOtherInputValue: (value: string) => void
  ) => {
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
        selectedCurrencyFrom,
        selectedCurrencyTo,
        setInputToValue
      );
    }
  }, [selectedCurrencyFrom, selectedCurrencyTo]);

  const defaultStyles = "flex flex-col justify-center items-center h-screen";
  const contStyles = "flex justify-center w-full space-x-4 py-5";
  const headerStyles = "text-4xl font-bold text-gray-700 py-8";
  if (loading) {
    return (
      <div className={defaultStyles}>
        <h1 className={headerStyles}>Загрузка...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className={defaultStyles}>
        <h1 className={headerStyles}>Ошибка</h1>
      </div>
    );
  }

  return (
    <div className={defaultStyles}>
      <h1 className={headerStyles}>Конвертер валют</h1>

      <div className={contStyles}>
        <div className="relative w-full max-w-[600px]">
          <span className="absolute left-[-180px] top-1/2 transform -translate-y-1/2 font-bold text-lg text-gray-700 mr-2">
            Вы переводите из
          </span>
          <SelectCurrency
            selectedCurrency={selectedCurrencyFrom}
            setSelectedCurrency={setSelectedCurrencyFrom}
          />
        </div>
        <span className=" top-1/2 font-bold text-lg text-gray-700 mr-2 mt-[5px]">
          в
        </span>
        <div className="w-full max-w-[600px]">
          <SelectCurrency
            selectedCurrency={selectedCurrencyTo}
            setSelectedCurrency={setSelectedCurrencyTo}
          />
        </div>
      </div>
      <div className={contStyles}>
        <div className="relative w-full max-w-[600px]">
          <Input
            inputValue={inputFromValue}
            setInputValue={setInputFromValue}
            onChangeFunction={(value) =>
              converter(
                value,
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
            setInputValue={setInputToValue}
            onChangeFunction={(value) =>
              converter(
                value,
                selectedCurrencyTo,
                selectedCurrencyFrom,
                setInputFromValue
              )
            }
          />
        </div>
      </div>
      <button
        className="hover:bg-sky-200 hover: underline"
        onClick={swapCurrencies}
      >
        поменять местами
      </button>
    </div>
  );
}

export default App;
