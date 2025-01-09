import { useCurrencies } from "../hooks/useCurrencies";
import { SelectOption, CurrencyDetails } from "../models";

export function useSelector(
  setSelectedCurrency: (currency: SelectOption | null) => void,
  setCurrencyDetails: (currencyDetails: CurrencyDetails | null) => void
) {
  const { currencies } = useCurrencies();
  const options = currencies.map((currency) => ({
    value: currency.CharCode,
    label: currency.Name,
  }));

  const handleChange = (selectedOption: SelectOption | null) => {
    if (selectedOption) {
      setSelectedCurrency(selectedOption);
      const currency = currencies.find(
        (cur) => cur.CharCode === selectedOption.value
      );
      if (currency) {
        setCurrencyDetails({
          Nominal: currency.Nominal,
          Value: currency.Value,
        });
      }
    } else {
      setCurrencyDetails(null);
    }
  };

  return {
    options,
    handleChange,
  };
}
