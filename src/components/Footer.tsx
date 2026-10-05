import React, { useState } from 'react';
import { Send, CheckCircle2, MapPin, Phone, Mail, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#231A14] text-[#E8DFD4] pt-16 pb-12 border-t border-[#3B2C21]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3B2C21]">
          
          {/* Brand Info (Cols 1-2) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight text-white block">
              Velvet &amp; Scoop
            </span>
            <p className="text-xs text-[#B5A596] max-w-sm leading-relaxed">
              Small-batch artisan creamery and seaside stall. Slow-churning pasture-raised Jersey milk into single-origin gelatos, handcrafted waffle cones, and seasonal fruit sundaes.
            </p>
            <div className="pt-2 text-xs text-[#9E8B7A] space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C48C46]" />
                <span>Harbor Pier 4 Promenade, Dockside Gate B</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C48C46]" />
                <span>Stall Line: (415) 890-4421</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Stall &amp; Scoops
            </span>
            <ul className="space-y-2 text-xs text-[#B8A798]">
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Daily Flavor Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('scoop-lab')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  The Scoop Lab (Custom)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('stall-location')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Stall Schedule &amp; Hours
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('craftsmanship')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Jersey Dairy Standard
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Event Cart
            </span>
            <ul className="space-y-2 text-xs text-[#B8A798]">
              <li>
                <button
                  onClick={() => onNavigate('catering')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Wedding Cart Hire
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catering')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Private Garden Parties
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catering')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Instant Quote Calculator
                </button>
              </li>
              <li>
                <span className="text-[#877566]">Pint Cooler Pre-Orders</span>
              </li>
            </ul>
          </div>

          {/* Secret Flavor Drops Newsletter */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Secret Churn Drops
            </span>
            <p className="text-xs text-[#B5A596] leading-relaxed">
              Receive notifications 1 hour before our limited-edition weekend micro-batches hit the stall cabinet.
            </p>
            
            {subscribed ? (
              <div className="p-2.5 bg-emerald-950/70 border border-emerald-800 text-emerald-300 rounded-lg text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>You&apos;re on the secret churn list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#2F231B] border border-[#48372A] rounded-l-lg text-white focus:outline-none focus:border-[#C48C46]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="px-3.5 py-2 bg-[#C48C46] hover:bg-[#AB6E33] text-white rounded-r-lg transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-[#867566] block">
                  No spam. Only ice cream release notes.
                </span>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Credits & Allergen note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7869] gap-4">
          <p>© {new Date().getFullYear()} Velvet &amp; Scoop Artisan Creamery Co. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Pasture-Raised Organic Milk</span>
            <span>·</span>
            <span>100% Compostable Packaging</span>
            <span>·</span>
            <span>Sanitized Dedicated Scoops</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
