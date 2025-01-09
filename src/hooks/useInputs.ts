import { useState, useEffect } from "react";
import { CurrencyDetails } from "../models";

interface UseInputsProps {
  currencyDetailsFrom: CurrencyDetails | null;
  currencyDetailsTo: CurrencyDetails | null;
  inputFromValue: string;
  setInputFromValue: (value: string) => void;
  inputToValue: string;
  setInputToValue: (value: string) => void;
}

export function useInputs({
  currencyDetailsFrom,
  currencyDetailsTo,
  inputFromValue,
  setInputFromValue,
  inputToValue,
  setInputToValue,
}: UseInputsProps) {
  const [isFromInputFocused, setIsFromInputFocused] = useState(false);
  const [isToInputFocused, setIsToInputFocused] = useState(false);

  useEffect(() => {
    if (isFromInputFocused && currencyDetailsFrom && currencyDetailsTo) {
      const convertedValue =
        (parseFloat(inputFromValue) *
          (currencyDetailsFrom.Value / currencyDetailsFrom.Nominal)) /
        (currencyDetailsTo.Value / currencyDetailsTo.Nominal);
      setInputToValue(isNaN(convertedValue) ? "" : convertedValue.toFixed(2));
    }
  }, [
    inputFromValue,
    isFromInputFocused,
    currencyDetailsFrom,
    currencyDetailsTo,
  ]);

  useEffect(() => {
    if (isToInputFocused && currencyDetailsFrom && currencyDetailsTo) {
      const convertedValue =
        (parseFloat(inputToValue) *
          (currencyDetailsTo.Value / currencyDetailsTo.Nominal)) /
        (currencyDetailsFrom.Value / currencyDetailsFrom.Nominal);
      setInputFromValue(isNaN(convertedValue) ? "" : convertedValue.toFixed(2));
    }
  }, [inputToValue, isToInputFocused, currencyDetailsFrom, currencyDetailsTo]);

  const handleInputFromChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (/^(?!0\d)(\d+(\.\d{0,2})?)?$/.test(value)) {
      setInputFromValue(value);
    }
  };

  const handleInputToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^(?!0\d)(\d+(\.\d{0,2})?)?$/.test(value)) {
      setInputToValue(value);
    }
  };

  const handleFromInputFocus = () => {
    setIsFromInputFocused(true);
    setIsToInputFocused(false);
  };

  const handleToInputFocus = () => {
    setIsFromInputFocused(false);
    setIsToInputFocused(true);
  };

  return {
    handleInputFromChange,
    handleInputToChange,
    handleFromInputFocus,
    handleToInputFocus,
  };
}