import { useState } from "react";
import { Inputs } from "./components/Inputs";
import { SelectFrom } from "./components/SelectFrom";
import { SelectTo } from "./components/SelectTo";
import { SelectOption, CurrencyDetails } from "./models";
import "./index.css";
import { useCurrencies } from "./hooks/useCurrencies";

function App() {
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] =
    useState<SelectOption | null>(null);
  const [currencyDetailsFrom, setCurrencyDetailsFrom] =
    useState<CurrencyDetails | null>(null);

  const [selectedCurrencyTo, setSelectedCurrencyTo] =
    useState<SelectOption | null>(null);
  const [currencyDetailsTo, setCurrencyDetailsTo] =
    useState<CurrencyDetails | null>(null);

  const [inputFromValue, setInputFromValue] = useState<string>("");
  const [inputToValue, setInputToValue] = useState<string>("");

  const { loading, error } = useCurrencies();

  const swapCurrencies = () => {
    setSelectedCurrencyFrom(selectedCurrencyTo);
    setCurrencyDetailsFrom(currencyDetailsTo);
    setSelectedCurrencyTo(selectedCurrencyFrom);
    setCurrencyDetailsTo(currencyDetailsFrom);

    setInputFromValue(inputToValue);
    setInputToValue(inputFromValue);
    // const tempInputFromValue = inputFromValue;
    // setInputFromValue(inputToValue);
    // setInputToValue(tempInputFromValue);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl font-bold text-gray-700 py-8">Загрузка...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl font-bold text-red-400 py-8">Ошибка</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold text-gray-700 py-8">Конвертер валют</h1>
      <div className="space-y-8 w-full">
        <div className="flex justify-center w-full space-x-4">
          <Inputs
            currencyDetailsFrom={currencyDetailsFrom}
            currencyDetailsTo={currencyDetailsTo}
            inputFromValue={inputFromValue}
            inputToValue={inputToValue}
            setInputFromValue={setInputFromValue}
            setInputToValue={setInputToValue}
          />
        </div>
        <div className="flex justify-center w-full space-x-4">
          <div className="relative w-full max-w-[600px]">
            <span className="absolute left-[-170px] top-1/2 transform -translate-y-1/2 font-bold text-lg text-gray-700 mr-2">
              Вы переводите из
            </span>
            <SelectFrom
              selectedCurrencyFrom={selectedCurrencyFrom}
              setSelectedCurrencyFrom={setSelectedCurrencyFrom}
              setCurrencyDetailsFrom={setCurrencyDetailsFrom}
            />
          </div>
          <span className="aboslute top-1/2 font-bold text-lg text-gray-700 mr-2 mt-[5px]">
            в
          </span>
          <div className="w-full max-w-[600px]">
            <SelectTo
              selectedCurrencyTo={selectedCurrencyTo}
              setSelectedCurrencyTo={setSelectedCurrencyTo}
              setCurrencyDetailsTo={setCurrencyDetailsTo}
            />
          </div>
        </div>
        <div className="flex justify-center w-full space-x-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              swapCurrencies();
            }}
            className="text-gray-700 font-bold hover:underline cursor-pointer border-2 border-grey p-2 rounded-xl"
          >
            Поменять местами
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
