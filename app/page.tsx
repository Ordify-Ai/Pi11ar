"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Sparkles, LineChart, Target, TrendingUp, DollarSign, Shield, ArrowRight, MapPin, Users } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import NavBar from "@/components/NavBar";
import { motion } from "framer-motion";

const roleCards = [
  {
    eyebrow: "Pi11ar Investor",
    title: "Invest in Bay View",
    body: "Explore funds that compound value locally through properties and businesses.",
    link: "#investor",
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    eyebrow: "Pi11ar Resident",
    title: "Tenant Portal & Rewards",
    body: "Manage your home via Doorloop, earn points for on-time rent, and redeem local offers.",
    link: "#tenant",
    icon: <Users className="w-6 h-6" />
  },
  {
    eyebrow: "Pi11ar Business Partner",
    title: "Owner Dashboard",
    body: "Verify your business, launch QR offers, and view visits & purchases by channel.",
    link: "#business",
    icon: <Target className="w-6 h-6" />
  }
];

const approachFeatures = [
  {
    icon: <Sparkles className="w-8 h-8 text-[hsl(var(--color-teal-blue))]" />,
    title: "Unparalleled Market Knowledge",
    description: "Decades of local expertise in Bay View: street-level comps, business pulse, and zoning nuance that national players miss."
  },
  {
    icon: <LineChart className="w-8 h-8 text-[hsl(var(--color-teal-blue))]" />,
    title: "Holistic Data-Driven Strategy",
    description: "Integrating rent rolls, foot-traffic, small-biz data, and demographic trends to underwrite not just assets—but the ecosystem."
  },
  {
    icon: <Building2 className="w-8 h-8 text-[hsl(var(--color-teal-blue))]" />,
    title: "Flawless Execution",
    description: "Disciplined acquisitions, value-add upgrades, and operations managed by trusted local partners."
  }
];

const whyREFeatures = [
  {
    title: "Diversified Investment Strategy",
    description: "Insulated from market whims with tangible, income-producing assets."
  },
  {
    title: "Multiprong Growth & Returns",
    description: "Dual engine of rental income and long-term appreciation for compounding growth."
  },
  {
    title: "Tax Benefits",
    description: "Depreciation shelters income and enhances after-tax yield potential."
  }
];

const whyPi11arPillars = [
  "Acquisition & Optimization – optimal pricing + high-impact improvements",
  "Management & Operations – trusted providers + economies of scale",
  "Resident Relationship Management – mobility, loyalty, reduced vacancy",
  "Complementary Investments – private credit supports key local businesses",
  "Unique Investor Benefits – exclusive discounts/offers for investors"
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const investorRef = useRef<HTMLDivElement>(null);
  const tenantRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);

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
  };

  return (
    <main className="min-h-screen bg-[hsl(var(--color-sky-cyan))]">
      <NavBar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" ref={heroRef}>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[hsl(var(--color-almost-black))]">
                Real Estate Investing — Enhanced
              </h1>
              <p className="text-lg md:text-xl text-[hsl(var(--color-neutral-dark))] mb-8">
                A neighborhood-focused platform aligning properties, local businesses, and investors to compound value in Milwaukee's Bay View community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-[hsl(var(--color-teal-blue))] hover:bg-[hsl(var(--color-teal-blue))]/90 text-white"
                  onClick={() => scrollToSection('#pi11ar-cta')}
                >
                  Consider Investing
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-[hsl(var(--color-teal-blue))] text-[hsl(var(--color-teal-blue))] hover:bg-[hsl(var(--color-teal-blue))]/10"
                  onClick={() => scrollToSection('#where')}
                >
                  Where am I investing?
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-[hsl(var(--color-teal-blue))]/20 to-[hsl(var(--color-bright-blue))]/20 rounded-3xl flex items-center justify-center">
                <Building2 className="w-64 h-64 text-[hsl(var(--color-teal-blue))]/30" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Role CTA Section */}
      <section id="pi11ar-cta" className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[hsl(var(--color-almost-black))]">
            Are you a Pi11ar investor, resident, or business partner?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
            {roleCards.map((card, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all border-2 hover:border-[hsl(var(--color-teal-blue))]/50 rounded-3xl bg-white"
              >
                <div className="text-sm font-semibold text-[hsl(var(--color-teal-blue))] mb-2">{card.eyebrow}</div>
                <div className="mb-4 text-[hsl(var(--color-teal-blue))]">{card.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-[hsl(var(--color-almost-black))]">{card.title}</h3>
                <p className="text-[hsl(var(--color-neutral-dark))] mb-6">{card.body}</p>
                <Button 
                  variant="outline" 
                  className="w-full group border-[hsl(var(--color-teal-blue))] text-[hsl(var(--color-teal-blue))] hover:bg-[hsl(var(--color-teal-blue))]/10"
                  onClick={() => scrollToSection(card.link)}
                >
                  <span className="mr-2">Start {card.title.split(' ')[0]} Journey</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section id="about" className="py-24 bg-[hsl(var(--color-neutral-light))]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[hsl(var(--color-almost-black))]">Our Approach</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {approachFeatures.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center p-6 bg-[hsl(var(--color-teal-blue))] rounded-2xl">
            <p className="text-2xl font-bold text-white">
              The Result — Superior Performance · Enhanced Value
            </p>
          </div>
        </div>
      </section>

      {/* Why Real Estate Section */}
      <section id="learn" className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[hsl(var(--color-almost-black))]">Why Real Estate Investing?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyREFeatures.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Pi11ar Section */}
      <section id="why-pi11ar" className="py-24 bg-[hsl(var(--color-neutral-light))]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[hsl(var(--color-almost-black))]">Why Invest in Pi11ar?</h2>
          <p className="text-center text-lg text-[hsl(var(--color-neutral-dark))] mb-16 max-w-2xl mx-auto">
            A singular community focus enables an amplifying network effect across all investments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {whyPi11arPillars.map((pillar, index) => (
              <Card key={index} className="p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
                <div className="w-8 h-8 bg-[hsl(var(--color-teal-blue))] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-[hsl(var(--color-neutral-dark))]">{pillar}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Where Section */}
      <section id="where" className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[hsl(var(--color-almost-black))]">Where am I investing?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-[hsl(var(--color-teal-blue))]" />
                <h3 className="text-2xl font-bold">City · Milwaukee, WI</h3>
              </div>
              <p className="text-muted-foreground">
                Under the radar yet stable… resilience from market swings and climate risks.
              </p>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-[hsl(var(--color-teal-blue))]" />
                <h3 className="text-2xl font-bold">Neighborhood · Bay View</h3>
              </div>
              <p className="text-muted-foreground">
                Historic, thriving lakeside community with 300+ small businesses and ongoing revitalization.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background/95 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">Pi11ar</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A neighborhood-focused platform aligning properties, local businesses, and investors
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <button onClick={() => scrollToSection('#pi11ar-cta')} className="text-sm text-muted-foreground hover:text-foreground">
              Investor
            </button>
            <button onClick={() => scrollToSection('#pi11ar-cta')} className="text-sm text-muted-foreground hover:text-foreground">
              Tenant
            </button>
            <button onClick={() => scrollToSection('#pi11ar-cta')} className="text-sm text-muted-foreground hover:text-foreground">
              Business
            </button>
            <button onClick={() => scrollToSection('#about')} className="text-sm text-muted-foreground hover:text-foreground">
              Learn
            </button>
          </div>
          <div className="pt-8 border-t text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Pi11ar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
} 