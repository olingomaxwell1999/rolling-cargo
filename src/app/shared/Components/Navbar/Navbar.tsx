"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, DollarSign, Bell, Mail, Search } from "lucide-react";

// Custom Button Component
const CustomButton: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <button
    className={`inline-flex items-center justify-center rounded-lg transition-all duration-200 ${className}`}
  >
    {children}
  </button>
);

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLink: React.FC<{
    href: string;
    className?: string;
    children: React.ReactNode;
    isMenuLink?: boolean;
    isMobile?: boolean;
  }> = ({ href, className, children, isMenuLink, isMobile }) => (
    <Link
      href={href}
      className={className}
      onClick={() => {
        if (isMobile || isMenuLink) {
          toggleMenu();
        }
      }}
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section with hamburger menu and tracking button */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <NavLink
              href="/tracking"
              className="bg-[#0f1031] hover:bg-[#1a1b4b] text-white px-2 md:px-4 py-1 md:py-2 rounded-lg flex items-center gap-1 md:gap-2 text-xs md:text-base"
            >
              <Search size={isMobile ? 14 : 18} />
              <span className="hidden md:inline">Track Shipment</span>
              <span className="md:hidden">Track</span>
            </NavLink>
          </div>

          {/* Center section with logo */}
          <div className="flex items-center justify-center">
            <NavLink href="/" className="flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={isMobile ? 50 : 80}
                height={isMobile ? 50 : 80}
                style={{ objectFit: 'contain' }}
                onError={(e) => {
                  console.error("Error loading logo:", e);
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.insertAdjacentHTML('afterend', '<span class="text-xl font-bold">Your Logo</span>');
                }}
              />
              <span className="ml-2 text-sm text-gray-500 font-medium hidden sm:block">
                Since 2007
              </span>
            </NavLink>
          </div>

          {/* Right section with icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <NavLink
              href="/cost-estimator"
              className="text-gray-500 hover:text-gray-600 flex flex-col items-center"
            >
              <DollarSign size={isMobile ? 16 : 24} />
              <span className="text-[8px] md:text-xs mt-1">Cost Estimator</span>
            </NavLink>
            <NavLink
              href="/blog"
              className="text-gray-500 hover:text-gray-600 flex flex-col items-center"
            >
              <Bell size={isMobile ? 16 : 24} />
              <span className="text-[8px] md:text-xs mt-1">Updates</span>
            </NavLink>
            <NavLink
              href="/contact-us"
              className="text-gray-500 hover:text-gray-600 flex flex-col items-center"
            >
              <Mail size={isMobile ? 16 : 24} />
              <span className="text-[8px] md:text-xs mt-1">Contact Us</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Menu content */}
      <div
        className={`fixed inset-0 z-50 bg-white overflow-y-auto transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <X size={24} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* First category */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {[
                  "About us",
                  "Our Services",
                  "FAQ",
                  "Air Cargo",
                  "Sea Cargo",
                  "Online Shopping",
                  "Custom Clearance",
                ].map((item) => (
                  <li key={item}>
                    <NavLink
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-600 hover:text-gray-900"
                      isMenuLink={true}
                    >
                      {item}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Second category */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    href="/tracking"
                    className="text-gray-600 hover:text-gray-900 flex items-center"
                    isMobile={true}
                  >
                    <Search className="mr-2" size={16} /> Track Shipment
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href="/cost-estimator"
                    className="text-gray-600 hover:text-gray-900 flex items-center"
                    isMobile={true}
                  >
                    <DollarSign className="mr-2" size={16} /> Cost Estimator
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href="/blog"
                    className="text-gray-600 hover:text-gray-900 flex items-center"
                    isMobile={true}
                  >
                    <Bell className="mr-2" size={16} /> Updates
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Third category */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {["Careers", "Blog", "Feedback", "FAQ", "Contact us", "Terms & Conditions"].map(
                  (item) => (
                    <li key={item}>
                      <NavLink
                        href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-gray-600 hover:text-gray-900"
                        isMenuLink={true}
                      >
                        {item}
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Responsive image */}
          <div className="mt-8 w-full max-w-md mx-auto">
            <Image
              src="/aeo.jpg"
              alt="Toggle Image"
              width={400}
              height={200}
              layout="responsive"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;