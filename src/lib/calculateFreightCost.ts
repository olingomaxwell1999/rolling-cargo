// src/lib/calculateFreightCost.ts

import { airFreightRates, seaFreightRates, handlingFees } from "@/data/data";
import { CountryName, SeaFreightRate } from "@/types/feright.types";

type FreightType = "air" | "sea";

export interface CalculationResult {
  freightCost: number;
  handlingFee: number;
  totalCost: number;
}

export function calculateFreightCost(
  type: FreightType,
  country: CountryName,
  weight?: number,
  cbm?: number
): CalculationResult {
  let freightCost = 0;
  let handlingFee = 0;

  if (type === "air") {
    const rateData = airFreightRates[country];
    if (!rateData) throw new Error(`No air rate found for ${country}`);

    const { baseRate, minimumRate } = rateData;
    if (!weight) throw new Error("Weight is required for air freight");

    freightCost = weight * baseRate;

    // Apply minimum rate if weight <= 1kg
    if (minimumRate && weight <= 1) {
      freightCost = minimumRate;
    }

    handlingFee = handlingFees[country]?.air || 0;
  }

  if (type === "sea") {
    const rateData = seaFreightRates[country] as SeaFreightRate;
    if (!rateData) throw new Error(`No sea rate found for ${country}`);

    if (typeof rateData === "number") {
      // Simple per CBM rate
      freightCost = (cbm || 0) * rateData;
    } else {
      const { regular, small, large } = rateData;

      if (small && cbm && cbm <= 0.2) {
        freightCost = small;
      } else if (large && cbm && cbm > 10) {
        freightCost = large;
      } else {
        freightCost = (cbm || 0) * regular;
      }
    }

    handlingFee = handlingFees[country]?.sea || 0;
  }

  const totalCost = freightCost + handlingFee;

  return {
    freightCost,
    handlingFee,
    totalCost,
  };
}
