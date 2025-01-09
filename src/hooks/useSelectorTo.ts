import { useCurrencies } from "../hooks/useCurrencies";
import { SelectOption, CurrencyDetails } from "../models";

export function useSelectorTo(
  setSelectedCurrencyTo: (currency: SelectOption | null) => void,
  setCurrencyDetailsTo: (currencyDetails: CurrencyDetails | null) => void
) {
  const { currencies } = useCurrencies();
  const optionsTo = currencies.map((currency) => ({
    value: currency.CharCode,
    label: currency.Name,
  }));

  const handleChangeTo = (selectedOption: SelectOption | null) => {
    if (selectedOption) {
      setSelectedCurrencyTo(selectedOption);
      const currency = currencies.find(
        (cur) => cur.CharCode === selectedOption.value
      );
      if (currency) {
        setCurrencyDetailsTo({
          Nominal: currency.Nominal,
          Value: currency.Value,
        });
      }
    } else {
      setCurrencyDetailsTo(null);
    }
  };

  return {
    optionsTo,
    handleChangeTo,
  };
}
