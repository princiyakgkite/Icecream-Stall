import React from 'react';
import { X, Check, AlertTriangle, ShieldCheck, MapPin, Milk, Plus } from 'lucide-react';
import { Flavor, CartItem } from '../data/iceCreamData';

interface FlavorDetailModalProps {
  flavor: Flavor | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const FlavorDetailModal: React.FC<FlavorDetailModalProps> = ({
  flavor,
  onClose,
  onAddToCart,
}) => {
  if (!flavor) return null;

  const handleAdd = (size: 'Single' | 'Double') => {
    const unitPrice = size === 'Single' ? flavor.pricePerSingle : flavor.pricePerSingle + 3.50;
    const cartItem: CartItem = {
      id: `${flavor.id}-${size}-${Date.now()}`,
      type: 'standard',
      title: flavor.name,
      subtitle: `${size} Scoop in House Waffle Cone`,
      size,
      vessel: 'House Brown Butter Waffle Cone',
      scoops: [{ name: flavor.name, color: flavor.color }],
      unitPrice,
      quantity: 1,
      image: flavor.image,
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-[#FAF7F0] w-full max-w-xl rounded-2xl border border-[#E8DFCF] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with image */}
        <div className="relative aspect-[16/9] bg-[#EAE2D3] overflow-hidden">
          <img
            src={flavor.image}
            alt={flavor.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="text-xs uppercase tracking-wider text-amber-200 font-semibold block mb-1">
              {flavor.category.toUpperCase()} CHURN · {flavor.fatContent}
            </span>
            <h3 className="font-serif-display text-2xl font-bold">{flavor.name}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          
          <p className="text-sm text-[#504033] leading-relaxed">
            {flavor.description}
          </p>

          {/* Tasting notes */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A7565] block mb-1.5">
              Flavor Profile &amp; Finish
            </span>
            <div className="flex flex-wrap gap-1.5">
              {flavor.tastingNotes.map((note) => (
                <span
                  key={note}
                  className="text-xs text-[#524134] bg-[#EFE7DA] border border-[#E2D6C3] px-2.5 py-1 rounded"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Farm Origin & Dairy Details */}
          <div className="p-4 bg-white rounded-xl border border-[#E5DAC8] space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-[#2A1F18]">
              <Milk className="w-4 h-4 text-[#AB6E33]" />
              <span>Dairy &amp; Ingredient Provenance</span>
            </div>
            <p className="text-[#655547] leading-relaxed">
              <strong>Source:</strong> {flavor.dairySource}
            </p>
            <div className="pt-2 border-t border-[#EFE8DA]">
              <strong>Pure Ingredients:</strong> {flavor.ingredients.join(', ')}
            </div>
          </div>

          {/* Allergen & Dietary Transparency */}
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Allergen Transparency</span>
            </div>
            <p className="text-amber-950">
              {flavor.allergens.length > 0
                ? `Contains: ${flavor.allergens.join(', ')}.`
                : 'Contains no common allergens (Nut-Free, Egg-Free, Dairy-Free recipe).'}
            </p>
            <p className="text-[11px] text-amber-800 italic">
              Dietary badges: {flavor.dietary.join(' · ')}. Cones and scoops are served with sanitized dedicated stainless scoops.
            </p>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E8DFCF] flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-[#7A6A5C] block">From</span>
            <span className="font-mono text-lg font-bold text-[#2A1F18] tabular-nums">
              ${flavor.pricePerSingle.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAdd('Single')}
              className="px-4 py-2 text-xs font-semibold bg-[#EFE8DC] hover:bg-[#E4D9C8] text-[#36291F] rounded-lg transition-colors cursor-pointer"
            >
              Single Scoop (${flavor.pricePerSingle.toFixed(2)})
            </button>
            <button
              onClick={() => handleAdd('Double')}
              className="px-4 py-2 text-xs font-semibold bg-[#2A1F18] hover:bg-[#3D2E24] text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Double Scoop (${(flavor.pricePerSingle + 3.5).toFixed(2)})</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
