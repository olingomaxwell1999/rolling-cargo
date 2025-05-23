"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  X,
  Plane,
  Ship,
  Package,
  Bell,
  Phone,
  Mail,
  Loader2,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import Image from "next/image";

// Configuration constants
const CONFIG = {
  EMAIL_JS: {
    SERVICE_ID: "service_od2wm1x",
    TEMPLATE_ID: "template_lws7abq",
    PUBLIC_KEY: "AWuVmDvp3lqD8Xks_",
  },
  PHONE_NUMBER: "+254709 286 286",
  IMAGE_TRANSITION_INTERVAL: 5000,
  POPUP_DELAY: 1000,
  SUCCESS_MESSAGE_DURATION: 2000,
} as const;

const backgroundImages = [
  {
    src: "/banner3.jpg",
    alt: "Air and sea cargo services banner",
    priority: true,
  },
];

// Types
interface CustomAlertProps {
  onClose: () => void;
}

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  shippingMode: "air" | "sea";
  weight: string;
  volumetricWeight: string;
  cbm: string;
  message: string;
}

interface FormStatus {
  message: string;
  type: "success" | "error" | null;
}

interface FormErrors {
  [key: string]: string;
}

// Validation utilities
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

const validateNumber = (value: string, min = 0): boolean => {
  const num = parseFloat(value);
  return !isNaN(num) && num > min;
};

// Custom hooks
const useFormValidation = (formData: ContactFormData) => {
  return useMemo(() => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.weight) {
      errors.weight = "Weight is required";
    } else if (!validateNumber(formData.weight)) {
      errors.weight = "Weight must be a positive number";
    }

    if (!formData.volumetricWeight) {
      errors.volumetricWeight = "Volumetric weight is required";
    } else if (!validateNumber(formData.volumetricWeight)) {
      errors.volumetricWeight = "Volumetric weight must be a positive number";
    }

    if (!formData.cbm) {
      errors.cbm = "CBM is required";
    } else if (!validateNumber(formData.cbm)) {
      errors.cbm = "CBM must be a positive number";
    }

    return errors;
  }, [formData]);
};

// Components
const CustomAlert: React.FC<CustomAlertProps> = ({ onClose }) => {
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4"
      style={{ marginTop: "64px" }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-labelledby="alert-title"
      aria-describedby="alert-description"
    >
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full relative animate-fadeIn">
        <div className="flex items-center mb-3">
          <Bell className="mr-3 text-blue-500 flex-shrink-0" size={24} />
          <h3 id="alert-title" className="text-lg font-semibold">
            ANNOUNCEMENT!
          </h3>
        </div>

        <div id="alert-description">
          <p className="text-sm text-gray-600 mb-4">
            To help us serve you more efficiently, please share the details
            below when sending your cargo to us:
          </p>
          <ul className="list-disc pl-5 mb-4 text-sm text-gray-600 space-y-1">
            <li>Name</li>
            <li>Contact</li>
            <li>Mode of shipping (air or by sea)</li>
          </ul>
          <p className="text-sm text-gray-600 mb-6">
            For all other queries, talk to us on{" "}
            <strong>{CONFIG.PHONE_NUMBER}</strong>
          </p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-3">Contact Us</h4>
          <Link href="/contact-us">
            <button className="bg-[#0f1031] text-white px-6 py-2 rounded-md hover:bg-[#1a1548] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Contact Us
            </button>
          </Link>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Close announcement"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

const ContactForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    shippingMode: "air",
    weight: "",
    volumetricWeight: "",
    cbm: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    message: "",
    type: null,
  });

  const errors = useFormValidation(formData);
  const isFormValid = Object.keys(errors).length === 0;

  const handleInputChange = useCallback(
    (field: keyof ContactFormData) =>
      (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));

        // Clear form status when user starts typing
        if (formStatus.message) {
          setFormStatus({ message: "", type: null });
        }
      },
    [formStatus.message]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!isFormValid) {
        setFormStatus({
          message: "Please fix the errors below before submitting.",
          type: "error",
        });
        return;
      }

      setIsSubmitting(true);
      setFormStatus({ message: "", type: null });

      try {
        const templateParams = {
          to_name: "Recipient Name",
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          phone: formData.phone.trim(),
          shipping_mode: formData.shippingMode,
          weight: formData.weight,
          volumetric_weight: formData.volumetricWeight,
          cbm: formData.cbm,
          message: formData.message.trim(),
        };

        await emailjs.send(
          CONFIG.EMAIL_JS.SERVICE_ID,
          CONFIG.EMAIL_JS.TEMPLATE_ID,
          templateParams,
          CONFIG.EMAIL_JS.PUBLIC_KEY
        );

        setFormStatus({
          message: "Quote request sent successfully! We will contact you soon.",
          type: "success",
        });

        setTimeout(() => {
          onClose();
        }, CONFIG.SUCCESS_MESSAGE_DURATION);
      } catch (error) {
        console.error("EmailJS Error:", error);
        setFormStatus({
          message:
            "Failed to send quote request. Please try again or contact us directly.",
          type: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, isFormValid, onClose]
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const InputField: React.FC<{
    label: string;
    name: keyof ContactFormData;
    type?: string;
    required?: boolean;
    placeholder?: string;
  }> = ({ label, name, type = "text", required = false, placeholder }) => (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium mb-2 text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={`w-full p-3 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          errors[name]
            ? "border-red-500 bg-red-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        value={formData[name]}
        onChange={handleInputChange(name)}
        disabled={isSubmitting}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <p
          id={`${name}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      style={{ marginTop: "64px" }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-labelledby="form-title"
    >
      <div
        className="relative bg-white rounded-lg w-full max-w-md max-h-[calc(100vh-100px)] overflow-y-auto shadow-xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white p-6 border-b z-10 rounded-t-lg">
          <h2 id="form-title" className="text-2xl font-bold text-gray-800">
            Request Quote
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
          {formStatus.message && (
            <div
              className={`p-4 rounded-md ${
                formStatus.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
              role="alert"
            >
              {formStatus.message}
            </div>
          )}

          <InputField
            label="Full Name"
            name="name"
            required
            placeholder="Enter your full name"
          />

          <InputField
            label="Phone Number"
            name="phone"
            type="tel"
            required
            placeholder="e.g., +254 700 000 000"
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            required
            placeholder="your.email@example.com"
          />

          <div>
            <label
              htmlFor="shippingMode"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Shipping Mode <span className="text-red-500">*</span>
            </label>
            <select
              id="shippingMode"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors"
              value={formData.shippingMode}
              onChange={handleInputChange("shippingMode")}
              disabled={isSubmitting}
            >
              <option value="air">Air Shipment</option>
              <option value="sea">Sea Shipment</option>
            </select>
          </div>

          <InputField
            label="Weight"
            name="weight"
            type="number"
            required
            placeholder="Weight in kg"
          />

          <InputField
            label="Volumetric Weight"
            name="volumetricWeight"
            type="number"
            required
            placeholder="Volumetric weight"
          />

          <InputField
            label="CBM (Cubic Meters)"
            name="cbm"
            type="number"
            required
            placeholder="Volume in cubic meters"
          />

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Additional Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors resize-vertical"
              rows={4}
              placeholder="Any additional information about your shipment..."
              value={formData.message}
              onChange={handleInputChange("message")}
              disabled={isSubmitting}
            />
          </div>

          <div className="sticky bottom-0 bg-white pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className={`w-full py-3 px-4 rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isSubmitting || !isFormValid
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-[#0f1031] text-white hover:bg-[#1a1548] active:bg-[#0a0a28]"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Submitting...
                </span>
              ) : (
                "Submit Quote Request"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showContactForm, setShowContactForm] = useState<boolean>(false);

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const openContactForm = useCallback(() => {
    setShowContactForm(true);
  }, []);

  const closeContactForm = useCallback(() => {
    setShowContactForm(false);
  }, []);

  useEffect(() => {
    // Image rotation (if multiple images are added later)
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, CONFIG.IMAGE_TRANSITION_INTERVAL);

    // Show popup after delay
    const popupTimeout = setTimeout(() => {
      setShowPopup(true);
    }, CONFIG.POPUP_DELAY);

    // Initialize EmailJS
    emailjs.init(CONFIG.EMAIL_JS.PUBLIC_KEY);

    return () => {
      clearInterval(intervalId);
      clearTimeout(popupTimeout);
    };
  }, []);

  const currentImage = backgroundImages[currentImageIndex];

  return (
    <div className="relative mb-28">
      <div className="relative mt-16 h-[250px] md:h-[400px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-cover transition-opacity duration-1000"
            priority={currentImage.priority}
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="icons flex items-center justify-center mb-4 md:mb-6">
            <Plane className="text-white mr-4" size={32} aria-hidden="true" />
            <Ship className="text-white" size={32} aria-hidden="true" />
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg max-w-3xl mx-auto mb-6">
            Air and Sea Cargo Experts
          </h1>

          <div className="max-w-xl mx-auto">
            <div className="p-4 shadow-xl">
              <div className="bg-white mx-auto rounded-lg h-[60px] md:h-[80px] flex items-center justify-center">
                <Image
                  src="/aeo.png"
                  alt="AEO Certified Cargo Services"
                  width={200}
                  height={80}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Services Box - Desktop only */}
        <div className="hidden md:block absolute -bottom-24 left-0 right-0 z-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-[#f8fafc] rounded-lg shadow-xl grid grid-cols-3 overflow-hidden">
              <Link
                href="/tracking"
                className="group p-6 hover:bg-[#0f1031] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Track your shipment"
              >
                <div className="flex flex-col items-center text-center">
                  <Package
                    className="text-[#640e0e] group-hover:text-white mb-4"
                    size={40}
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-white">
                    Track Shipment
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-300">
                    Track your cargo in real-time with our advanced tracking
                    system
                  </p>
                </div>
              </Link>

              <button
                onClick={openContactForm}
                className="group p-6 hover:bg-[#0f1031] transition-colors duration-300 border-l border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Request a quote"
              >
                <div className="flex flex-col items-center text-center">
                  <Mail
                    className="text-[#640e0e] group-hover:text-white mb-4"
                    size={40}
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-white">
                    Request Quote
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-white">
                    Get instant quotes for your shipping needs
                  </p>
                </div>
              </button>

              <Link
                href="/contact-us"
                className="group p-6 hover:bg-[#0f1031] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Contact our customer service"
              >
                <div className="flex flex-col items-center text-center">
                  <Phone
                    className="text-[#640e0e] group-hover:text-white mb-4"
                    size={40}
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-white">
                    Contact Us
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-white">
                    Get in touch with our customer service team
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showPopup && <CustomAlert onClose={closePopup} />}
      {showContactForm && <ContactForm onClose={closeContactForm} />}

      {/* CSS for animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
