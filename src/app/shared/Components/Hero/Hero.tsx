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
          <Plane size={32} />
          <Ship size={32} className="ml-4" />
          <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg max-w-3xl mx-auto my-6">
            Air and Sea Cargo Experts
          </h1>
        </motion.div>
      </div>

      {/* Services Box - Desktop only */}
      <div className="hidden md:block absolute -bottom-24 left-0 right-0 z-20">
        <div className="max-w-5xl mx-auto px-4">
          <Card className="overflow-hidden shadow-xl">
            <CardContent className="p-0 grid grid-cols-3">
              <Link href="/tracking" className="hover:bg-primary p-6">
                <Package />
                <h3>Track Shipment</h3>
                <p>Real-time tracking system</p>
              </Link>
              <Button
                variant="default"
                onClick={() => setShowContactForm(true)}
              >
                <Mail />
                Request Quote
              </Button>
              <Link href="/contact-us">Request Quote</Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
      {showPopup && <CustomAlert onClose={() => {}} />}
    </motion.div>
  );
}
