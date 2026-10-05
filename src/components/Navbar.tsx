import React from 'react';
import { ShoppingBag, MapPin, Clock } from 'lucide-react';
import { CartItem } from '../data/iceCreamData';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onNavigate,
}) => {
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8E1D5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); onNavigate('top'); }}
          className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight text-[#2A1F18] hover:opacity-90 transition-opacity"
        >
          Velvet &amp; Scoop
        </a>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#57493E]">
          <a
            href="#menu"
            onClick={(e) => { e.preventDefault(); onNavigate('menu'); }}
            className="hover:text-[#2A1F18] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#AB6E33] hover:after:w-full after:transition-all"
          >
            Daily Flavors
          </a>
          <a
            href="#scoop-lab"
            onClick={(e) => { e.preventDefault(); onNavigate('scoop-lab'); }}
            className="hover:text-[#2A1F18] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#AB6E33] hover:after:w-full after:transition-all"
          >
            Scoop Lab
          </a>
          <a
            href="#stall-location"
            onClick={(e) => { e.preventDefault(); onNavigate('stall-location'); }}
            className="hover:text-[#2A1F18] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#AB6E33] hover:after:w-full after:transition-all"
          >
            Stall &amp; Hours
          </a>
          <a
            href="#catering"
            onClick={(e) => { e.preventDefault(); onNavigate('catering'); }}
            className="hover:text-[#2A1F18] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#AB6E33] hover:after:w-full after:transition-all"
          >
            Event Cart Hire
          </a>
          <a
            href="#craftsmanship"
            onClick={(e) => { e.preventDefault(); onNavigate('craftsmanship'); }}
            className="hover:text-[#2A1F18] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#AB6E33] hover:after:w-full after:transition-all"
          >
            Our Dairy
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick stall live indicator */}
          <button
            onClick={() => onNavigate('stall-location')}
            className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#46382E] bg-[#F4EFE6] hover:bg-[#EFE8DC] border border-[#E2D8C6] px-3 py-2 rounded-lg transition-colors cursor-pointer"
            title="Stall open today at Pier 4 Promenade"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-semibold text-emerald-800">Pier 4</span>
            <span className="text-[#847363]">·</span>
            <span className="text-[#655344]">Open till 10 PM</span>
          </button>

          {/* Cart Bag button */}
          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="relative flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-white bg-[#2A1F18] hover:bg-[#3D2E24] active:scale-[0.98] rounded-lg transition-all shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#F7F3EB]" />
            <span className="hidden xs:inline">Stall Bag</span>
            <span className="bg-[#AB6E33] text-white text-[11px] px-1.5 py-0.2 rounded-full font-mono tabular-nums min-w-[20px] text-center">
              {totalCartCount}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
