"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import emailjs from "emailjs-com";
import {
  ContactFormProps,
  FormInputs,
  OfficeInfoProps,
} from "@/types/contact.types";
import { offices } from "@/data/data";

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  isSubmitting,
  submitStatus,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          {...register("name", { required: "Name is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Your Name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          {...register("message", { required: "Message is required" })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Your message here"
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0f1031] hover:bg-[#0f1031] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
        <Send className="ml-2 h-5 w-5" />
      </button>
      {submitStatus === "success" && (
        <p className="mt-4 text-sm text-green-600">
          Message sent successfully!
        </p>
      )}
      {submitStatus === "error" && (
        <p className="mt-4 text-sm text-red-600">
          An error occurred. Please try again.
        </p>
      )}
    </form>
  );
};

const OfficeInfo: React.FC<OfficeInfoProps> = ({ office }) => (
  <div className="border-l-4 border-[#0f1031] pl-4 mb-6 group">
    <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
      {office.name}
      {office.chineseName && (
        <span className="block text-sm group-hover:text-blue-600 transition-colors duration-300">
          {office.chineseName}
        </span>
      )}
    </h3>
    <div className="mt-2 text-sm text-gray-600 space-y-1">
      <p className="flex items-center group-hover:text-blue-600 transition-colors duration-300">
        <Phone className="mr-2 h-4 w-4 text-[#0f1031] group-hover:text-blue-600 transition-colors duration-300" />
        {office.chinesePhone || office.phone}
      </p>
      {office.email && (
        <p className="flex items-center group-hover:text-blue-600 transition-colors duration-300">
          <Mail className="mr-2 h-4 w-4 text-[#0f1031] group-hover:text-blue-600 transition-colors duration-300" />
          {office.email}
        </p>
      )}
      <p className="flex items-start group-hover:text-blue-600 transition-colors duration-300">
        <MapPin className="mr-2 h-4 w-4 text-[#0f1031] mt-1 group-hover:text-blue-600 transition-colors duration-300" />
        <span>{office.chineseAddress || office.address}</span>
      </p>
    </div>
  </div>
);

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const emailData: Record<string, string> = {
        name: data.name,
        email: data.email,
        message: data.message,
      };

      await emailjs.send(
        "service_od2wm1x",
        "template_lws7abq",
        emailData,
        "AWuVmDvp3lqD8Xks_"
      );
      setSubmitStatus("success");
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#0f1031] mb-12">
          Get in Touch
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-[#0f1031] mb-6">
            Send us a message
          </h2>
          <ContactForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-[#0f1031] mb-6">
            Our Offices
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <OfficeInfo key={index} office={office} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
