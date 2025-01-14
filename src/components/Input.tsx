interface InputProps {
  inputValue: string;
  onChangeFunction: (value: string) => void;
}

export function Input({ inputValue, onChangeFunction }: InputProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[0-9]*(\.[0-9]{0,4})?$/.test(value) || value === "") {
      onChangeFunction(value);
    } else {
      event.preventDefault();
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
