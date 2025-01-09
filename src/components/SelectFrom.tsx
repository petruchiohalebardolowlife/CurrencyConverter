import Select from "react-select";
import { SelectOption, CurrencyDetails } from "../models";
import { useSelectorFrom } from "../hooks/useSelectorFrom";

interface SelectFromProps {
  selectedCurrencyFrom: SelectOption | null;
  setSelectedCurrencyFrom: (currency: SelectOption | null) => void;
  setCurrencyDetailsFrom: (currencyDetails: CurrencyDetails | null) => void;
}

export function SelectFrom({
  selectedCurrencyFrom,
  setSelectedCurrencyFrom,
  setCurrencyDetailsFrom,
}: SelectFromProps) {
  const { optionsFrom, handleChangeFrom } = useSelectorFrom(
    setSelectedCurrencyFrom,
    setCurrencyDetailsFrom
  );

  return (
    <div className="w-full">
      <Select
        options={optionsFrom}
        value={selectedCurrencyFrom}
        onChange={handleChangeFrom}
        className="text-lg text-center font-bold"
        placeholder="Выберите валюту"
      />
    </div>
  );
}
