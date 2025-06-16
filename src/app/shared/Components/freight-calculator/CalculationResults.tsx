// src/components/CalculationResults.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";
import { getCurrencySymbol } from "@/lib/utils";

interface Props {
  freightType: "air" | "sea";
  country: string;
  freightCost: number;
  handlingFee: number;
  totalCost: number;
}

const CalculationResults: React.FC<Props> = ({
  freightType,
  country,
  freightCost,
  handlingFee,
  totalCost,
}) => {
  const symbol = getCurrencySymbol(country as any, freightType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
    >
      <div className="p-4 bg-gray-100 rounded-md text-center">
        <label className="block mb-1 text-sm text-gray-600">
          Freight Cost ({symbol})
        </label>
        <p className="text-lg font-bold">{freightCost.toFixed(2)}</p>
      </div>

      <div className="p-4 bg-gray-100 rounded-md text-center">
        <label className="block mb-1 text-sm text-gray-600">
          Handling Fee ({symbol})
        </label>
        <p className="text-lg font-bold">{handlingFee.toFixed(2)}</p>
      </div>

      <div className="p-4 bg-blue-100 rounded-md text-center">
        <label className="block mb-1 text-sm text-gray-600">
          Total Cost ({symbol})
        </label>
        <p className="text-xl font-bold">{totalCost.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export default CalculationResults;
