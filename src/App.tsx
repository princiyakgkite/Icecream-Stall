import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveStallTracker } from './components/LiveStallTracker';
import { MenuSection } from './components/MenuSection';
import { ScoopLab } from './components/ScoopLab';
import { CateringCartSection } from './components/CateringCartSection';
import { StorySection } from './components/StorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FlavorDetailModal } from './components/FlavorDetailModal';
import { Footer } from './components/Footer';
import { CartItem, Flavor, FLAVORS } from './data/iceCreamData';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'initial-sample-1',
      type: 'standard',
      title: 'Bronte Sicilian Pistachio',
      subtitle: 'Double Scoop in House Waffle Cone',
      size: 'Double',
      vessel: 'House Brown Butter Waffle Cone',
      scoops: [
        { name: 'Bronte Sicilian Pistachio', color: '#899E71' },
        { name: 'Brittany Salted Butter Caramel', color: '#BA7A3A' },
      ],
      unitPrice: 9.25,
      quantity: 1,
      image: '/src/assets/images/scoop_pistachio_cone_1791181432859.jpg',
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedFlavorModal, setSelectedFlavorModal] = useState<Flavor | null>(null);
  const [checkoutPickupTime, setCheckoutPickupTime] = useState('Ready in ~6 min (Immediate Walk-up)');
  const [checkoutTipAmount, setCheckoutTipAmount] = useState(1.38);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('top');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => {
      // If exact same ID exists, increment quantity
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i));
      }
      return [...prev, item];
    });

    showToast(`Added ${item.title} to your stall bag!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedToCheckout = (pickupTime: string, tipAmount: number) => {
    setCheckoutPickupTime(pickupTime);
    setCheckoutTipAmount(tipAmount);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = () => {
    setCart([]);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleQuickOrderPistachio = () => {
    const pistachio = FLAVORS[0];
    const quickItem: CartItem = {
      id: `quick-special-${Date.now()}`,
      type: 'standard',
      title: 'Bronte Sicilian Pistachio Special',
      subtitle: 'Single Scoop in House Waffle Cone',
      size: 'Single',
      vessel: 'House Brown Butter Waffle Cone',
      scoops: [{ name: pistachio.name, color: pistachio.color }],
      unitPrice: pistachio.pricePerSingle,
      quantity: 1,
      image: pistachio.image,
    };
    handleAddToCart(quickItem);
    setIsCartOpen(true);
  };

  return (
    <div id="top" className="min-h-screen bg-[#FDFBF7] text-[#2C241E] flex flex-col font-sans selection:bg-[#EEDBC5] selection:text-[#382618]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2A1F18] text-white px-4 py-3 rounded-xl shadow-xl border border-[#443327] flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Check className="w-3 h-3" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 font-semibold text-amber-300 hover:text-amber-200 underline cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}

      {/* 3-Zone Navigation Header */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onNavigate={handleNavigate}
          onQuickOrderPistachio={handleQuickOrderPistachio}
        />

        {/* Live Stall Coordinates, Schedule & Churn Alert */}
        <LiveStallTracker />

        {/* Daily Scoops & Signature Sundaes Menu */}
        <MenuSection
          onAddToCart={handleAddToCart}
          onSelectFlavorDetails={(flavor) => setSelectedFlavorModal(flavor)}
        />

        {/* The Scoop Lab - Interactive Custom Cone Builder */}
        <ScoopLab
          onAddToCart={handleAddToCart}
        />

        {/* Event Cart & Wedding Catering Calculator */}
        <CateringCartSection />

        {/* Pure Dairy Craftsmanship Philosophy */}
        <StorySection />

        {/* Testimonials & Food Critic Reviews */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        pickupTime={checkoutPickupTime}
        tipAmount={checkoutTipAmount}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Flavor Detail Modal */}
      <FlavorDetailModal
        flavor={selectedFlavorModal}
        onClose={() => setSelectedFlavorModal(null)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
