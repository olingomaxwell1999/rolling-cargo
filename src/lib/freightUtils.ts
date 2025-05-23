import { CountryName, CurrencyInfo } from "@/types/feright.types";

export const getCurrencyInfo = (
  country: CountryName,
  freightType: string
): CurrencyInfo => {
  if (country === "China" && freightType === "air")
    return { code: "USD", symbol: "$", rate: 1 };
  if (country === "Dubai" && freightType === "air")
    return { code: "USD", symbol: "$", rate: 1 };
  return {
    UK: { code: "GBP", symbol: "£", rate: 0.79 },
    China: { code: "USD", symbol: "$", rate: 1 },
    Turkey: { code: "USD", symbol: "$", rate: 1 },
    Netherlands: { code: "USD", symbol: "$", rate: 1 },
    Italy: { code: "USD", symbol: "$", rate: 1 },
    "South Africa": { code: "USD", symbol: "$", rate: 1 },
    Dubai: { code: "USD", symbol: "$", rate: 1 },
  }[country];
};
