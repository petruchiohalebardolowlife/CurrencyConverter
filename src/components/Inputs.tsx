import { useInputs } from "../hooks/useInputs";
import { CurrencyDetails } from "../models";

interface InputsProps {
  currencyDetailsFrom: CurrencyDetails | null;
  currencyDetailsTo: CurrencyDetails | null;
  inputFromValue: string;
  inputToValue: string;
  setInputFromValue: (value: string) => void;
  setInputToValue: (value: string) => void;
}

export function Inputs({
  currencyDetailsFrom,
  currencyDetailsTo,
  inputFromValue,
  inputToValue,
  setInputFromValue,
  setInputToValue,
}: InputsProps) {
  const { handleInputChange, handleFromInputFocus, handleToInputFocus } =
    useInputs({
      currencyDetailsFrom,
      currencyDetailsTo,
      inputFromValue,
      inputToValue,
      setInputFromValue,
      setInputToValue,
    });

  return (
    <div className="flex w-full justify-center space-x-4">
      <div className="w-full max-w-[600px]">
        <input
          type="text"
          className="w-full h-10 text-lg font-bold text-center border border-gray-300 rounded"
          value={inputFromValue}
          placeholder="Введите сумму"
          onChange={(event) => handleInputChange(event, setInputFromValue)}
          onFocus={handleFromInputFocus}
        />
      </div>
      <span className="font-bold text-lg text-gray-700 mr-2 mt-[3px]">=</span>
      <div className="w-full max-w-[600px]">
        <input
          type="text"
          className="w-full h-10 text-lg text-center font-bold border border-gray-300 rounded"
          value={inputToValue}
          placeholder="Результат"
          onChange={(event) => handleInputChange(event, setInputToValue)}
          onFocus={handleToInputFocus}
        />
      </div>
    </div>
  );
}
