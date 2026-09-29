import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveBottlePreview } from './components/InteractiveBottlePreview';
import { PackagesSection } from './components/PackagesSection';
import { AddOnsSection } from './components/AddOnsSection';
import { SpecialEventsSection } from './components/SpecialEventsSection';
import { ScentDiscoverySection } from './components/ScentDiscoverySection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { Footer } from './components/Footer';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { BookingInquiryModal } from './components/BookingInquiryModal';
import { FileText, Sparkles, MessageCircle } from 'lucide-react';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [activePackageForQuote, setActivePackageForQuote] = useState('first-class');
  const [customDesign, setCustomDesign] = useState<{
    title: string;
    city: string;
    coords: string;
    palette: string;
    scents: string[];
  } | null>(null);
  const [prefilledQuoteText, setPrefilledQuoteText] = useState('');

  // Handlers
  const handleOpenQuote = (pkgId: string = 'first-class') => {
    setActivePackageForQuote(pkgId);
    setIsQuoteModalOpen(true);
  };

  const handleOpenInquiry = (pkgId?: string) => {
    if (pkgId) {
      setActivePackageForQuote(pkgId);
    }
    setIsInquiryModalOpen(true);
  };

  const handleUseDesignInQuote = (config: {
    title: string;
    city: string;
    coords: string;
    palette: string;
    scents: string[];
  }) => {
    setCustomDesign(config);
    setIsQuoteModalOpen(true);
  };

  const handleProceedToInquiryFromQuote = (quoteText: string) => {
    setPrefilledQuoteText(quoteText);
    setIsQuoteModalOpen(false);
    setIsInquiryModalOpen(true);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2926] selection:bg-[#E8C8C6] selection:text-[#1F2124]">
      
      {/* 1. Header Navigation */}
      <Navbar 
        onOpenQuote={() => handleOpenQuote('first-class')} 
        onOpenInquiry={() => handleOpenInquiry()} 
      />

      {/* Main Content Sections */}
      <main className="flex-1 pb-16 sm:pb-0">
        
        {/* 2. Hero Section */}
        <Hero 
          onExplorePackages={() => scrollTo('packages')}
          onOpenStudio={() => scrollTo('bottle-studio')}
          onOpenQuote={() => handleOpenQuote('first-class')}
        />

        {/* 3. Interactive Bottle Studio (Coordinates & Label Customizer) */}
        <InteractiveBottlePreview 
          onUseInQuote={handleUseDesignInQuote}
        />

        {/* 4. Wedding / Debut / Baby Shower & Stag Packages */}
        <PackagesSection 
          onSelectPackageForQuote={(pkgId) => handleOpenQuote(pkgId)}
          onBookSession={(pkgId) => handleOpenInquiry(pkgId)}
        />

        {/* 5. Signature Add-Ons (Bride & Groom 100ml Duo + Entourage Gifts) */}
        <AddOnsSection 
          onAddBrideGroomToQuote={() => handleOpenQuote('first-class')}
          onAddEntourageToQuote={() => handleOpenQuote('first-class')}
        />

        {/* 6. Special Events (15-30, 31-50, 51-80, 81-100, 100+ Pax) */}
        <SpecialEventsSection 
          onSelectEventsTier={(tierId) => handleOpenQuote(tierId)}
          onOpenConsultation={() => handleOpenInquiry(activePackageForQuote)}
        />

        {/* 7. Discovery Set & Scent Library (10 & 20 Scents) */}
        <ScentDiscoverySection />

        {/* 8. Process & Timeline */}
        <ProcessTimeline />

      </main>

      {/* 9. Footer */}
      <Footer 
        onOpenQuote={() => handleOpenQuote('first-class')}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* Mobile Sticky Quick Action Bar (Discreet, within 15% mobile viewport cap) */}
      <aside 
        aria-label="Mobile quick actions"
        className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#DFD7CB] py-2.5 px-4 flex items-center justify-between gap-3 shadow-lg"
      >
        <button
          onClick={() => handleOpenQuote(activePackageForQuote)}
          className="flex-1 py-2 px-3 text-xs tracking-wider uppercase font-semibold text-[#1F2124] bg-white border border-[#D5CDC1] rounded-xs flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <FileText className="w-3.5 h-3.5 text-[#708794]" />
          <span>Quick Quote ₱</span>
        </button>

        <button
          onClick={() => handleOpenInquiry()}
          className="flex-1 py-2 px-3 text-xs tracking-wider uppercase font-semibold text-white bg-[#1F2124] rounded-xs flex items-center justify-center gap-1.5 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E5C5C2]" />
          <span>Inquire / Book</span>
        </button>
      </aside>

      {/* Modals */}
      <QuoteCalculatorModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialPackageId={activePackageForQuote}
        customDesignConfig={customDesign}
        onProceedToInquiry={handleProceedToInquiryFromQuote}
      />

      <BookingInquiryModal 
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        prefilledQuote={prefilledQuoteText}
        initialPackageId={activePackageForQuote}
      />

    </div>
  );
}
