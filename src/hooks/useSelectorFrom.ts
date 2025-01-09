import { useCurrencies } from "../hooks/useCurrencies";
import { SelectOption, CurrencyDetails } from "../models";

export function useSelectorFrom(
  setSelectedCurrencyFrom: (currency: SelectOption | null) => void,
  setCurrencyDetailsFrom: (currencyDetails: CurrencyDetails | null) => void
) {
  const { currencies } = useCurrencies();
  const optionsFrom = currencies.map((currency) => ({
    value: currency.CharCode,
    label: currency.Name,
  }));

  const handleChangeFrom = (selectedOption: SelectOption | null) => {
    if (selectedOption) {
      setSelectedCurrencyFrom(selectedOption);
      const currency = currencies.find(
        (cur) => cur.CharCode === selectedOption.value
      );
      if (currency) {
        setCurrencyDetailsFrom({
          Nominal: currency.Nominal,
          Value: currency.Value,
        });
      }
    } else {
      setCurrencyDetailsFrom(null);
    }
  };

  return {
    optionsFrom,
    handleChangeFrom,
  };
}
