"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { socialLinks } from "@/data/data";

const SocialMedia: React.FC = () => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
      <div className="flex space-x-4 mb-4">
        {socialLinks.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            className="text-gray-800 hover:text-gray-600"
          >
            {social.icon === "Facebook" && <Facebook size={24} />}
            {social.icon === "Twitter" && <Twitter size={24} />}
            {social.icon === "Linkedin" && <Linkedin size={24} />}
            {social.icon === "Instagram" && <Instagram size={24} />}
          </Link>
        ))}
      </div>
      <Image
        src="/aeo.png"
        alt="Social Media"
        width={160}
        height={80}
        className="w-40 h-auto"
      />
    </div>
  );
};

export default SocialMedia;
