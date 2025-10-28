"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Building2 } from "lucide-react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (anchor: string) => {
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-[hsl(var(--color-sky-cyan))]/80 backdrop-blur-sm border-b" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[hsl(var(--color-teal-blue))] rounded flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-[hsl(var(--color-almost-black))]">Pi11ar</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('#pi11ar-cta')} className="text-sm font-medium text-[hsl(var(--color-almost-black))] hover:text-[hsl(var(--color-teal-blue))] transition-colors">
              Investor
            </button>
            <button onClick={() => scrollToSection('#pi11ar-cta')} className="text-sm font-medium text-[hsl(var(--color-almost-black))] hover:text-[hsl(var(--color-teal-blue))] transition-colors">
              Tenant
            </button>
            <button onClick={() => scrollToSection('#pi11ar-cta')} className="text-sm font-medium text-[hsl(var(--color-almost-black))] hover:text-[hsl(var(--color-teal-blue))] transition-colors">
              Business
            </button>
            <button onClick={() => scrollToSection('#about')} className="text-sm font-medium text-[hsl(var(--color-almost-black))] hover:text-[hsl(var(--color-teal-blue))] transition-colors">
              Learn
            </button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-[hsl(var(--color-sky-cyan))]/80 backdrop-blur-sm">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('#pi11ar-cta')} className="text-sm font-medium text-[hsl(var(--color-almost-black))] hover:text-[hsl(var(--color-teal-blue))] transition-colors text-left">
                Investor
              </button>
              <button onClick={() => scrollToSection('#pi11ar-cta')} className="text-sm font-medium text-[hsl(var(--color-almost-black))] hover:text-[hsl(var(--color-teal-blue))] transition-colors text-left">
                Tenant
              </button>
              <button onClick={() => scrollToSection('#pi11ar-cta')} className="text-sm font-medium text-[hsl(var(--color-almost-black))] hover:text-[hsl(var(--color-teal-blue))] transition-colors text-left">
                Business
              </button>
              <button onClick={() => scrollToSection('#about')} className="text-sm font-medium text-[hsl(var(--color-almost-black))] hover:text-[hsl(var(--color-teal-blue))] transition-colors text-left">
                Learn
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 