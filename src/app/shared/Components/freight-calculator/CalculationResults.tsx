"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalculationResultsProps } from "@/types/feright.types";

const CalculationResults: React.FC<CalculationResultsProps> = ({
  cost,
  handlingFee,
  totalCost,
  freightType,
  country,
}) => {
  if (!freightType || !country) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
    >
      <div className="p-4 bg-gray-100 rounded-md text-center">
        <label className="block mb-1 text-sm text-gray-600">
          Freight Cost ({getCurrencySymbol(country, freightType)})
        </label>
        <p className="text-lg font-bold">{cost}</p>
      </div>

      <div className="p-4 bg-gray-100 rounded-md text-center">
        <label className="block mb-1 text-sm text-gray-600">
          Handling Fee ({getCurrencySymbol(country, freightType)})
        </label>
        <p className="text-lg font-bold">{handlingFee}</p>
      </div>

      <div className="p-4 bg-blue-100 rounded-md text-center">
        <label className="block mb-1 text-sm text-gray-600">
          Total Cost ({getCurrencySymbol(country, freightType)})
        </label>
        <p className="text-xl font-bold">{totalCost}</p>
      </div>
    </motion.div>
  );
};

type Country =
  | "UK"
  | "China"
  | "Turkey"
  | "Netherlands"
  | "Italy"
  | "South Africa"
  | "Dubai";

function getCurrencySymbol(country: Country, freightType: any): string {
  if (country === "China" && freightType === "air") return "$";
  if (country === "Dubai" && freightType === "air") return "$";
  const currencyMap: Record<Country, string> = {
    UK: "£",
    China: "$",
    Turkey: "$",
    Netherlands: "$",
    Italy: "$",
    "South Africa": "$",
    Dubai: "$",
  };
  return currencyMap[country] || "$";
}

export default CalculationResults;
