interface InputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onChangeFunction?: (value: string) => void;
}

export function Input({
  inputValue,
  setInputValue,
  onChangeFunction,
}: InputProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^(?!0\d)(\d+(\.\d{0,4})?)?$/.test(value)) {
      setInputValue(value);
      if (onChangeFunction) {
        onChangeFunction(value);
      }
    }
  };

  return (
    <div className="flex w-full justify-center px-3">
      <div className="w-full max-w-[600px]">
        <input
          type="text"
          className="w-full h-10 text-lg font-bold text-center border border-gray-300 rounded"
          value={inputValue}
          placeholder="Введите сумму"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
