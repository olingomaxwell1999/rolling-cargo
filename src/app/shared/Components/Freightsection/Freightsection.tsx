"use client";

import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import CalculationResults from "../freight-calculator/CalculationResults";
import FreightForm from "../freight-calculator/FreightForm";
import CountrySelector from "../freight-calculator/CountrySelector";
import FreightTypeSelector from "../freight-calculator/FreightTypeSelector";
import { airFreightRates, handlingFees, seaFreightRates } from "@/data/data";
import { getCurrencyInfo } from "@/lib/freightUtils";

const FreightCalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    freightType: null as "air" | "sea" | null,
    country: null as
      | "UK"
      | "China"
      | "Turkey"
      | "Netherlands"
      | "Italy"
      | "South Africa"
      | "Dubai"
      | null,
    weight: "",
    length: "",
    width: "",
    height: "",
    cbm: "",
    name: "",
    phone: "",
    email: "",
  });

  const [volumetricWeight, setVolumetricWeight] = useState<number | null>(null);
  const [cost, setCost] = useState<string>("00");
  const [handlingFee, setHandlingFee] = useState<string>("00");
  const [totalCost, setTotalCost] = useState<string>("00");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    emailjs.init("AWuVmDvp3lqD8Xks_"); // Replace with actual public key
  }, []);

  useEffect(() => {
    if (formData.length && formData.width && formData.height) {
      const vol =
        (parseFloat(formData.length) *
          parseFloat(formData.width) *
          parseFloat(formData.height)) /
        6000;
      setVolumetricWeight(vol);
    } else {
      setVolumetricWeight(null);
    }
  }, [formData.length, formData.width, formData.height]);

  useEffect(() => {
    if (!formData.country || !formData.freightType) {
      setCost("00");
      setHandlingFee("00");
      setTotalCost("00");
      return;
    }

    const currency = getCurrencyInfo(formData.country, formData.freightType);

    let calculatedCost = 0;
    let calculatedHandlingFee = 0;

    if (formData.freightType === "air") {
      const actualWeight = parseFloat(formData.weight) || 0;
      const volWeight = volumetricWeight || 0;
      const chargeableWeight = Math.max(actualWeight, volWeight);
      const rate = airFreightRates[formData.country];
      calculatedCost = chargeableWeight * rate.baseRate;
      calculatedHandlingFee = handlingFees[formData.country]?.air || 0;
    } else if (formData.freightType === "sea" && formData.cbm) {
      const cbmValue = parseFloat(formData.cbm);
      const rate = seaFreightRates[formData.country];
      if (typeof rate === "number") {
        calculatedCost = cbmValue * rate;
      } else {
        if (formData.country === "Dubai" || formData.country === "China") {
          if (rate) {
            calculatedCost = cbmValue <= 0.2 ? rate.small! : rate.regular;
          } else {
            calculatedCost = 0;
          }
        } else if (formData.country === "Turkey") {
          if (rate) {
            calculatedCost =
              cbmValue > 10 ? rate.large! : cbmValue * rate.regular;
          } else {
            calculatedCost = 0;
          }
        } else {
          calculatedCost = rate ? cbmValue * rate.regular : 0;
        }
      }
      calculatedHandlingFee = handlingFees[formData.country]?.sea || 0;
    }

    const total = calculatedCost + calculatedHandlingFee;

    setCost(`${currency.symbol}${calculatedCost.toFixed(2)}`);
    setHandlingFee(`${currency.symbol}${calculatedHandlingFee.toFixed(2)}`);
    setTotalCost(`${currency.symbol}${total.toFixed(2)}`);
  }, [formData, volumetricWeight]);

  const handleRadioChange = (field: string, value: any) => {
    if (field === "freightType") {
      setFormData((prev) => ({
        ...prev,
        freightType: value as "air" | "sea",
        country: null,
      }));
    } else if (field === "country") {
      setFormData((prev) => ({
        ...prev,
        country: value as
          | "UK"
          | "China"
          | "Turkey"
          | "Netherlands"
          | "Italy"
          | "South Africa"
          | "Dubai",
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (formErrors[id]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.freightType)
      errors.freightType = "Please select a freight type";
    if (!formData.country) errors.country = "Please select a country";
    if (formData.freightType === "air") {
      if (!formData.weight) errors.weight = "Weight is required";
      if (!formData.length) errors.length = "Length is required";
      if (!formData.width) errors.width = "Width is required";
      if (!formData.height) errors.height = "Height is required";
    } else if (formData.freightType === "sea") {
      if (!formData.cbm) errors.cbm = "CBM is required";
    }
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const templateParams = {
        freight_type: formData.freightType,
        country: formData.country,
        weight: formData.weight,
        volumetric_weight: volumetricWeight?.toFixed(2),
        cbm: formData.cbm,
        cost,
        handling_fee: handlingFee,
        total_cost: totalCost,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      };

      await emailjs.send(
        "service_od2wm1x",
        "template_lws7abq",
        templateParams,
        "AWuVmDvp3lqD8Xks_"
      );

      setSubmitMessage("Your message has been sent successfully!");
      setFormData({
        freightType: null,
        country: null,
        weight: "",
        length: "",
        width: "",
        height: "",
        cbm: "",
        name: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Freight Services</h2>
      <FreightTypeSelector
        selectedType={formData.freightType}
        onSelect={(type) => handleRadioChange("freightType", type)}
      />
      {formData.freightType && (
        <CountrySelector
          freightType={formData.freightType}
          selectedCountry={formData.country}
          onSelect={(country) => handleRadioChange("country", country)}
        />
      )}
      {formData.freightType && formData.country && (
        <>
          <FreightForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors={formErrors}
            freightType={formData.freightType}
            volumetricWeight={volumetricWeight}
          />
          <CalculationResults
            cost={cost}
            handlingFee={handlingFee}
            totalCost={totalCost}
            freightType={formData.freightType}
            country={formData.country}
          />
        </>
      )}
      {submitMessage && (
        <p
          className={`mt-4 ${
            submitMessage.includes("successfully")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {submitMessage}
        </p>
      )}
    </section>
  );
};

export default FreightCalculator;
