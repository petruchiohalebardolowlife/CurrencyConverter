import Select from "react-select";
import { SelectOption, CurrencyDetails } from "../models";
import { useSelector } from "../hooks/useSelector";

interface SelectProps {
  selectedCurrency: SelectOption | null;
  setSelectedCurrency: (currency: SelectOption | null) => void;
  setCurrencyDetails: (currencyDetails: CurrencyDetails | null) => void;
}

export function SelectCurrency({
  selectedCurrency,
  setSelectedCurrency,
  setCurrencyDetails,
}: SelectProps) {
  const { options, handleChange } = useSelector(
    setSelectedCurrency,
    setCurrencyDetails
  );

  return (
    <div className="w-full">
      <Select
        options={options}
        value={selectedCurrency}
        onChange={handleChange}
        className="text-lg text-center font-bold"
        placeholder="Выберите валюту"
      />
    </div>
  );
}
