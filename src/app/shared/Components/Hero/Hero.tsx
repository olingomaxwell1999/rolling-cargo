"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Package, Plane, Ship } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useImageRotation, usePopup } from "@/hooks/useHeroAnimations";
import { backgroundImages } from "@/data/data";
import { CustomAlert } from "./CustomAlert";
import ContactForm from "./ContactForm";

export default function Hero() {
  const [showContactForm, setShowContactForm] = useState(false);
  const currentImageIndex = useImageRotation(backgroundImages.length);
  const { showPopup } = usePopup();
  const currentImage = backgroundImages[currentImageIndex];
  const [alertOpen, setAlertOpen] = useState(false);

  const {
    formData,
    isSubmitting,
    formStatus,
    handleInputChange,
    handleSubmit,
  } = useFormHandler();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative mb-28"
    >
      {/* Background Image */}
      <div className="relative mt-16 h-[250px] md:h-[400px] overflow-hidden">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 h-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Side-by-side Icons */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Plane size={48} className="text-white" />
            <Ship size={48} className="text-white" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg max-w-3xl mx-auto my-6">
            Air and Sea Cargo Experts
          </h1>
        </motion.div>
      </div>
      {/* Services Box - Desktop only */}
      <div className="hidden md:block absolute -bottom-24 left-0 right-0 z-20">
        <div className="max-w-5xl mx-auto px-4">
          <Card className="overflow-hidden shadow-xl border-none">
            <CardContent className="p-0 grid grid-cols-3 divide-x divide-gray-300">
              {/* Track Shipment */}
              <Link
                href="/tracking"
                className="flex flex-col items-center justify-center p-6 text-center bg-[#0f1031] text-white transition-none"
              >
                <Package className="mb-2 w-6 h-6" />
                <h3 className="font-semibold mb-1">Track Shipment</h3>
                <p className="text-sm opacity-80">Real-time tracking system</p>
              </Link>

              {/* Request Quote */}
              <button
                onClick={() => setShowContactForm(true)}
                className="flex flex-col items-center justify-center p-6 text-center focus:outline-none hover:bg-transparent"
              >
                <Mail className="mb-2 w-6 h-6 text-primary" />
                <h3 className="font-semibold mb-1">Request Quote</h3>
                <p className="text-sm text-muted-foreground">
                  Get a customized quote
                </p>
              </button>

              {/* Contact Us */}
              <Link
                href="/contact-us"
                className="flex flex-col items-center justify-center p-6 text-center bg-[#0f1031] text-white transition-none"
              >
                <Plane className="mb-2 w-6 h-6" />
                <h3 className="font-semibold mb-1">Contact Us</h3>
                <p className="text-sm opacity-80">Reach out for support</p>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
      {showPopup && (
        <CustomAlert open={alertOpen} onOpenChange={setAlertOpen} />
      )}
    </motion.div>
  );
}
