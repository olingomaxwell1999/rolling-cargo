"use client"
import React, { useState, FormEvent, useEffect } from "react";
import emailjs from "@emailjs/browser";

// Types
type FreightType = "air" | "sea";
type Country = "UK" | "China" | "Turkey" | "Netherlands" | "Italy" | "South Africa" | "Dubai";

interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number;
}

interface FormData {
  freightType: FreightType | null;
  country: Country | null;
  weight: string;
  length: string;
  width: string;
  height: string;
  cbm: string;
  name: string;
  phone: string;
  email: string;
}

// Configuration data
const currencyMap: Record<Country, CurrencyInfo> = {
  UK: { code: "GBP", symbol: "£", rate: 0.79 },
  China: { code: "USD", symbol: "$", rate: 1 },
  Turkey: { code: "USD", symbol: "$", rate: 1 },
  Netherlands: { code: "USD", symbol: "$", rate: 1 },
  Italy: { code: "USD", symbol: "$", rate: 1 },
  "South Africa": { code: "USD", symbol: "$", rate: 1 },
  Dubai: { code: "USD", symbol: "$", rate: 1 }
};

const airFreightRates: Record<Country, { baseRate: number; minimumRate?: number }> = {
  UK: { baseRate: 6.5 }, // GBP
  China: { baseRate: 12, minimumRate: 15 }, // USD
  Turkey: { baseRate: 7.5 }, // USD
  Netherlands: { baseRate: 11 }, // USD
  Italy: { baseRate: 11 }, // USD
  "South Africa": { baseRate: 13 }, // USD
  Dubai: { baseRate: 8, minimumRate: 10 } // USD
};

const handlingFees: Record<Country, { air: number; sea?: number }> = {
  UK: { air: 25, sea: 15 }, // GBP
  China: { air: 0 },
  Turkey: { air: 20, sea: 10 }, // USD
  Netherlands: { air: 40, sea: 20 }, // USD
  Italy: { air: 40 }, // USD
  "South Africa": { air: 0 },
  Dubai: { air: 0 }
};

const seaFreightRates: Partial<Record<Country, number | { regular: number; small?: number; large?: number }>> = {
  UK: { regular: 2.5 }, // GBP per CBM
  Dubai: { regular: 60000, small: 12000 }, // KES
  China: { regular: 60000, small: 12000 }, // KES
  Turkey: { regular: 750, large: 600 }, // USD
  Netherlands: { regular: 5 } // USD per CBM
};

const airFreightCountries: Country[] = ["UK", "China", "Turkey", "Netherlands", "Italy", "South Africa", "Dubai"];
const seaFreightCountries: Country[] = ["UK", "China", "Turkey", "Netherlands", "Dubai"];

// EmailJS configuration
const EMAIL_SERVICE_ID = "service_od2wm1x";
const EMAIL_TEMPLATE_ID = "template_lws7abq";
const EMAIL_PUBLIC_KEY = "AWuVmDvp3lqD8Xks_";

const FreightCalculator: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    freightType: null,
    country: null,
    weight: "",
    length: "",
    width: "",
    height: "",
    cbm: "",
    name: "",
    phone: "",
    email: ""
  });

  // Calculation state
  const [volumetricWeight, setVolumetricWeight] = useState<number | null>(null);
  const [cost, setCost] = useState<string>("00");
  const [handlingFee, setHandlingFee] = useState<string>("00");
  const [totalCost, setTotalCost] = useState<string>("00");
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAIL_PUBLIC_KEY);
  }, []);

  // Calculate volumetric weight when dimensions change
  useEffect(() => {
    if (formData.length && formData.width && formData.height) {
      const volumetric = (parseFloat(formData.length) * parseFloat(formData.width) * parseFloat(formData.height)) / 6000;
      setVolumetricWeight(volumetric);
    } else {
      setVolumetricWeight(null);
    }
  }, [formData.length, formData.width, formData.height]);

  // Calculate costs when relevant fields change
  useEffect(() => {
    if (!formData.country || !formData.freightType) {
      resetCosts();
      return;
    }

    const currencyInfo = getCurrencyInfo(formData.country, formData.freightType);
    let calculatedCost = 0;
    let calculatedHandlingFee = 0;

    if (formData.freightType === "air") {
      const actualWeight = parseFloat(formData.weight) || 0;
      const volWeight = volumetricWeight || 0;
      const chargeableWeight = Math.max(actualWeight, volWeight);
      const rate = airFreightRates[formData.country];

      if (chargeableWeight < 1 && rate.minimumRate) {
        calculatedCost = rate.minimumRate;
      } else {
        calculatedCost = chargeableWeight * rate.baseRate;
      }

      calculatedHandlingFee = handlingFees[formData.country].air;
    } else if (formData.freightType === "sea" && formData.cbm) {
      const cbmValue = parseFloat(formData.cbm);
      const seaRate = seaFreightRates[formData.country];

      if (seaRate) {
        if (typeof seaRate === "number") {
          calculatedCost = cbmValue * seaRate;
        } else {
          if (formData.country === "Dubai" || formData.country === "China") {
            calculatedCost = cbmValue <= 0.2 ? seaRate.small! : seaRate.regular;
          } else if (formData.country === "Turkey") {
            calculatedCost = cbmValue > 10 ? seaRate.large! : cbmValue * seaRate.regular;
          } else {
            calculatedCost = cbmValue * seaRate.regular;
          }
        }
      }

      calculatedHandlingFee = handlingFees[formData.country].sea || 0;
    }

    const total = calculatedCost + calculatedHandlingFee;

    setCost(calculatedCost > 0 ? `${currencyInfo.symbol}${calculatedCost.toFixed(2)}` : "00");
    setHandlingFee(calculatedHandlingFee > 0 ? `${currencyInfo.symbol}${calculatedHandlingFee.toFixed(2)}` : "00");
    setTotalCost(total > 0 ? `${currencyInfo.symbol}${total.toFixed(2)}` : "00");
    
  }, [formData.weight, volumetricWeight, formData.cbm, formData.country, formData.freightType]);

  // Get currency info based on country and freight type
  const getCurrencyInfo = (country: Country, freightType: FreightType): CurrencyInfo => {
    if (country === "China") {
      return freightType === "air" 
        ? { code: "USD", symbol: "$", rate: 1 }
        : { code: "KES", symbol: "KSh", rate: 1 };
    }
    if (country === "Dubai") {
      return freightType === "air"
        ? { code: "USD", symbol: "$", rate: 1 }
        : { code: "KES", symbol: "KSh", rate: 1 };
    }
    return currencyMap[country];
  };

  // Reset cost calculations
  const resetCosts = () => {
    setCost("00");
    setHandlingFee("00");
    setTotalCost("00");
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear error for this field if one exists
    if (formErrors[id as keyof FormData]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id as keyof FormData];
        return newErrors;
      });
    }
  };

  // Handle radio button changes
  const handleRadioChange = (field: 'freightType' | 'country', value: FreightType | Country) => {
    // When switching freight type, clear country selection
    if (field === 'freightType') {
      setFormData(prev => ({ 
        ...prev, 
        freightType: value as FreightType, 
        country: null 
      }));
    } else if (field === 'country') {
      setFormData(prev => ({ 
        ...prev, 
        country: value as Country 
      }));
    }
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.freightType) errors.freightType = "Please select a freight type";
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

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
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
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        templateParams,
        EMAIL_PUBLIC_KEY
      );

      setSubmitMessage("Your message has been sent successfully!");
      
      // Reset form fields
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
        email: ""
      });
      setVolumetricWeight(null);
      resetCosts();
      
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">
        Freight services<span className="text-red-500">*</span>
      </h2>

      {formErrors.freightType && (
        <p className="text-red-500 mb-2">{formErrors.freightType}</p>
      )}
      <div className="mb-6">
        <label className="inline-flex items-center mr-6">
          <input
            type="radio"
            className="form-radio"
            name="freightType"
            value="air"
            checked={formData.freightType === "air"}
            onChange={() => handleRadioChange('freightType', 'air')}
          />
          <span className="ml-2">Air Freight</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name="freightType"
            value="sea"
            checked={formData.freightType === "sea"}
            onChange={() => handleRadioChange('freightType', 'sea')}
          />
          <span className="ml-2">Sea Freight</span>
        </label>
      </div>

      {formData.freightType && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Select Country</h3>
          {formErrors.country && (
            <p className="text-red-500 mb-2">{formErrors.country}</p>
          )}
          <div className="flex flex-wrap">
            {(formData.freightType === "air" ? airFreightCountries : seaFreightCountries).map((c) => (
              <label key={c} className="inline-flex items-center mr-4 mb-2">
                <input
                  type="radio"
                  className="form-radio"
                  name="country"
                  value={c}
                  checked={formData.country === c}
                  onChange={() => handleRadioChange('country', c as Country)}
                />
                <span className="ml-2">{c}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {formData.freightType && formData.country && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {formData.freightType === "air" && (
            <>
              <div>
                <label htmlFor="weight" className="block mb-1">
                  Weight (kg) <span className="text-red-500">*</span>
                </label>
                {formErrors.weight && (
                  <p className="text-red-500 text-sm">{formErrors.weight}</p>
                )}
                <input
                  type="number"
                  id="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded ${
                    formErrors.weight ? "border-red-500" : ""
                  }`}
                  placeholder="00"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="length" className="block mb-1">
                    Length (cm) <span className="text-red-500">*</span>
                  </label>
                  {formErrors.length && (
                    <p className="text-red-500 text-sm">{formErrors.length}</p>
                  )}
                  <input
                    type="number"
                    id="length"
                    value={formData.length}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded ${
                      formErrors.length ? "border-red-500" : ""
                    }`}
                    placeholder="00"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label htmlFor="width" className="block mb-1">
                    Width (cm) <span className="text-red-500">*</span>
                  </label>
                  {formErrors.width && (
                    <p className="text-red-500 text-sm">{formErrors.width}</p>
                  )}
                  <input
                    type="number"
                    id="width"
                    value={formData.width}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded ${
                      formErrors.width ? "border-red-500" : ""
                    }`}
                    placeholder="00"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label htmlFor="height" className="block mb-1">
                    Height (cm) <span className="text-red-500">*</span>
                  </label>
                  {formErrors.height && (
                    <p className="text-red-500 text-sm">{formErrors.height}</p>
                  )}
                  <input
                    type="number"
                    id="height"
                    value={formData.height}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded ${
                      formErrors.height ? "border-red-500" : ""
                    }`}
                    placeholder="00"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
              {volumetricWeight !== null && (
                <div>
                  <label htmlFor="volumetricWeight" className="block mb-1">
                    Volumetric Weight (kg)
                  </label>
                  <input
                    type="text"
                    id="volumetricWeight"
                    value={volumetricWeight.toFixed(2)}
                    placeholder="00"
                    className="w-full px-3 py-2 border rounded bg-gray-100"
                    readOnly
                  />
                </div>
              )}
            </>
          )}

          {formData.freightType === "sea" && (
            <div>
              <label htmlFor="cbm" className="block mb-1">
                CBM (Cubic Meters) <span className="text-red-500">*</span>
              </label>
              {formErrors.cbm && (
                <p className="text-red-500 text-sm">{formErrors.cbm}</p>
              )}
              <input
                type="number"
                id="cbm"
                value={formData.cbm}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded ${
                  formErrors.cbm ? "border-red-500" : ""
                }`}
                placeholder="00"
                min="0"
                step="0.01"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="cost" className="block mb-1">
                Freight Cost ({formData.country && formData.freightType ? getCurrencyInfo(formData.country, formData.freightType).code : ""})
              </label>
              <input
                type="text"
                id="cost"
                value={cost}
                placeholder="00"
                className="w-full px-3 py-2 border rounded bg-gray-100"
                readOnly
              />
            </div>

            <div>
              <label htmlFor="handlingFee" className="block mb-1">
                Handling Fee ({formData.country && formData.freightType ? getCurrencyInfo(formData.country, formData.freightType).code : ""})
              </label>
              <input
                type="text"
                id="handlingFee"
                value={handlingFee}
                placeholder="00"
                className="w-full px-3 py-2 border rounded bg-gray-100"
                readOnly
              />
            </div>

            <div>
              <label htmlFor="totalCost" className="block mb-1 font-semibold">
                Total Cost ({formData.country && formData.freightType ? getCurrencyInfo(formData.country, formData.freightType).code : ""})
              </label>
              <input
                type="text"
                id="totalCost"
                value={totalCost}
                placeholder="00"
                className="w-full px-3 py-2 border rounded bg-gray-100 font-bold text-lg"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="name" className="block mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              {formErrors.name && (
                <p className="text-red-500 text-sm">{formErrors.name}</p>
              )}
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded ${
                  formErrors.name ? "border-red-500" : ""
                }`}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              {formErrors.phone && (
                <p className="text-red-500 text-sm">{formErrors.phone}</p>
              )}
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded ${
                  formErrors.phone ? "border-red-500" : ""
                }`}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
              )}
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded ${
                  formErrors.email ? "border-red-500" : ""
                }`}
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-[#0f1031] text-white rounded hover:bg-[#1a1b4b] transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Talk to us"}
            </button>
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
          </div>
        </form>
      )}

      {/* Disclaimer note */}
      <p className="mt-8 text-sm text-gray-600 italic">
        Note that this calculator is designed to provide an estimate only. For actual costs contact us directly on +254709286286
      </p>
    </section>
  );
};

export default FreightCalculator;
