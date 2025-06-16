"use client";

import React, { useState } from "react";
import { calculateFreightCost } from "@/lib/calculateFreightCost";
import { CountryName, FreightType } from "@/types/feright.types";
import { airFreightCountries, seaFreightCountries } from "@/data/data";
import FreightTypeSelector from "../freight-calculator/FreightTypeSelector";
import CountrySelector from "../freight-calculator/CountrySelector";
import FreightForm from "../freight-calculator/FreightForm";
import CalculationResults from "../freight-calculator/CalculationResults";

const FreightSection: React.FC = () => {
  const [freightType, setFreightType] = useState<FreightType | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryName | null>(
    null
  );

  const [formData, setFormData] = useState({
    weight: "",
    length: "",
    width: "",
    height: "",
    cbm: "",
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [volumetricWeight, setVolumetricWeight] = useState<number | null>(null);
  const [calculationResult, setCalculationResult] = useState<{
    freightCost: number;
    handlingFee: number;
    totalCost: number;
  } | null>(null);

  const handleFreightTypeSelect = (type: FreightType) => {
    setFreightType(type);
    setFormData({
      ...formData,
      weight: "",
      length: "",
      width: "",
      height: "",
      cbm: "",
    });
    setErrors({});
    setVolumetricWeight(null);
    setCalculationResult(null);
  };

  const handleCountrySelect = (country: CountryName) => {
    setSelectedCountry(country);
    setCalculationResult(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    if (
      (id === "weight" ||
        id === "length" ||
        id === "width" ||
        id === "height") &&
      freightType === "air"
    ) {
      const weight =
        id === "weight" ? parseFloat(value) : parseFloat(formData.weight);
      const length =
        id === "length" ? parseFloat(value) : parseFloat(formData.length);
      const width =
        id === "width" ? parseFloat(value) : parseFloat(formData.width);
      const height =
        id === "height" ? parseFloat(value) : parseFloat(formData.height);

      if (!isNaN(length) && !isNaN(width) && !isNaN(height)) {
        const vw = (length * width * height) / 5000; // Volumetric divisor
        setVolumetricWeight(vw);
      }
    }

    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!freightType || !selectedCountry) {
      alert("Please select both freight type and country.");
      return;
    }

    let newErrors: Record<string, string> = {};
    let isValid = true;

    if (freightType === "air") {
      const weight = parseFloat(formData.weight);
      const length = parseFloat(formData.length);
      const width = parseFloat(formData.width);
      const height = parseFloat(formData.height);

      if (isNaN(weight) || weight <= 0) {
        newErrors.weight = "Weight must be greater than 0.";
        isValid = false;
      }

      if (isNaN(length) || isNaN(width) || isNaN(height)) {
        newErrors.dimensions = "All dimensions are required.";
        isValid = false;
      }
    }

    if (freightType === "sea") {
      const cbm = parseFloat(formData.cbm);
      if (isNaN(cbm) || cbm <= 0) {
        newErrors.cbm = "CBM must be greater than 0.";
        isValid = false;
      }
    }

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();

    if (!name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!phone) {
      newErrors.phone = "Phone is required.";
      isValid = false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Valid email is required.";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = calculateFreightCost(
        freightType,
        selectedCountry,
        parseFloat(formData.weight),
        parseFloat(formData.cbm)
      );

      setCalculationResult(result);
    } catch (error) {
      console.error(error);
      alert("Error calculating cost. Please check your input.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Freight Cost Calculator</h2>

      <FreightTypeSelector
        selectedType={freightType}
        onSelect={handleFreightTypeSelect}
      />

      {freightType && (
        <CountrySelector
          freightType={freightType}
          selectedCountry={selectedCountry}
          onSelect={handleCountrySelect}
        />
      )}

      {freightType && selectedCountry && (
        <>
          <FreightForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors={errors}
            freightType={freightType}
            selectedCountry={selectedCountry}
            volumetricWeight={volumetricWeight}
          />

          {calculationResult && (
            <CalculationResults
              freightType={freightType}
              country={selectedCountry}
              freightCost={calculationResult.freightCost}
              handlingFee={calculationResult.handlingFee}
              totalCost={calculationResult.totalCost}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FreightSection;
