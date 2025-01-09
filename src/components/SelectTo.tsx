import Select from "react-select";
import { CurrencyDetails, SelectOption } from "../models";
import { useSelectorTo } from "../hooks/useSelectorTo";

interface SelectToProps {
  selectedCurrencyTo: SelectOption | null;
  setSelectedCurrencyTo: (currency: SelectOption | null) => void;
  setCurrencyDetailsTo: (currencyDetails: CurrencyDetails | null) => void;
}

export function SelectTo({
  selectedCurrencyTo,
  setSelectedCurrencyTo,
  setCurrencyDetailsTo,
}: SelectToProps) {
  const { optionsTo, handleChangeTo } = useSelectorTo(
    setSelectedCurrencyTo,
    setCurrencyDetailsTo
  );

  return (
    <div className="w-full">
      <Select
        options={optionsTo}
        value={selectedCurrencyTo}
        onChange={handleChangeTo}
        className="text-lg text-center font-bold"
        placeholder="Выберите валюту"
      />
    </div>
  );
}
