import { useCurrencies } from "../hooks/useCurrencies";
import { SelectOption } from "../models";

export function useSelector(
  setSelectedCurrency: (currency: SelectOption | null) => void
) {
  const { currencies } = useCurrencies();
  const options = currencies.map((currency) => ({
    value: currency.CharCode,
    label: currency.Name,
    nominal: currency.Nominal,
    valueInCurrency: currency.Value,
  }));

  const handleChange = (selectedOption: SelectOption | null) => {
    if (selectedOption) {
      setSelectedCurrency(selectedOption);
    } else {
      setSelectedCurrency(null);
    }
  };

  return {
    options,
    handleChange,
  };
}
