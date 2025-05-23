// src/types/freightTypes.ts

export type FreightType = "air" | "sea";
export type CountryName =
  | "UK"
  | "China"
  | "Turkey"
  | "Netherlands"
  | "Italy"
  | "South Africa"
  | "Dubai";

export interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number;
}

export interface FormData {
  freightType: FreightType | null;
  country: CountryName | null;
  weight: string;
  length: string;
  width: string;
  height: string;
  cbm: string;
  name: string;
  phone: string;
  email: string;
}

export interface CountrySelectorProps {
  freightType: FreightType | null;
  selectedCountry: CountryName | null;
  onSelect: (country: CountryName) => void;
}

export interface CalculationResultsProps {
  cost: string;
  handlingFee: string;
  totalCost: string;
  freightType: string | null;
  country: CountryName | null;
}

export interface FreightFormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: Record<string, string>;
  freightType: string | null;
  volumetricWeight: number | null;
}
