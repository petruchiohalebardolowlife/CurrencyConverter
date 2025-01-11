export interface ICurrency {
  ID: string;
  NumCode: number;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
}

export interface IApiResponse {
  Date: string;
  PreviousDate: string;
  PreviousURL: string;
  Timestamp: string;
  Valute: { [key: string]: ICurrency };
}

export interface SelectOption {
  value: string;
  label: string;
  nominal: number;
  valueInCurrency: number;
}
