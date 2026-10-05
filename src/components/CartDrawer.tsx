import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { CartItem } from '../data/iceCreamData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (pickupTime: string, tipAmount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [pickupTime, setPickupTime] = useState<string>('Ready in ~6 min (Immediate Walk-up)');
  const [tipPercent, setTipPercent] = useState<number>(15);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tipAmount = (subtotal * tipPercent) / 100;
  const tax = subtotal * 0.0825;
  const grandTotal = subtotal + tipAmount + tax;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F0] border-l border-[#E5DAC8] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#E8DFCF] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2A1F18]" />
              <h2 className="font-serif-display text-xl font-bold text-[#2A1F18]">
                Stall Counter Bag
              </h2>
            </div>
            
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="w-8 h-8 rounded-full hover:bg-[#F2ECE0] flex items-center justify-center text-[#6A5A4D] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <div className="w-16 h-16 rounded-full bg-[#EFE8DC] flex items-center justify-center text-[#8C7A6B]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-lg font-bold text-[#2A1F18]">
                  Your stall bag is empty
                </h3>
                <p className="text-xs text-[#786657] max-w-xs">
                  Select a flavor from today&apos;s slow-churned menu or craft a custom stack in the Scoop Lab.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-[#2A1F18] rounded-lg hover:bg-[#3D2E24] cursor-pointer"
                >
                  Browse Scoops
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl border border-[#E8DFCF] shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-serif-display text-base font-bold text-[#2A1F18]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#756455]">{item.subtitle}</p>
                      
                      {/* Breakdown for custom items */}
                      {item.type === 'custom_builder' && (
                        <div className="mt-1 text-[11px] text-[#8C6436] space-y-0.5">
                          {item.scoops && <div>Scoops: {item.scoops.map(s => s.name).join(' · ')}</div>}
                          {item.toppings && item.toppings.length > 0 && (
                            <div>Toppings: {item.toppings.join(', ')}</div>
                          )}
                        </div>
                      )}
                    </div>

                    <span className="font-mono text-sm font-bold text-[#2A1F18] tabular-nums whitespace-nowrap">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE0]">
                    <div className="flex items-center border border-[#E5DAC8] rounded-lg overflow-hidden bg-[#FAF7F0]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                        className="px-2.5 py-1 text-xs text-[#524438] hover:bg-[#EAE0D0] transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-mono font-semibold text-[#2A1F18] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                        className="px-2.5 py-1 text-xs text-[#524438] hover:bg-[#EAE0D0] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      aria-label="Remove item"
                      className="text-xs text-[#9B4545] hover:text-[#7A2828] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#E8DFCF] space-y-4">
              
              {/* Pickup Slot selector */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#6D5B4D] mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#AB6E33]" />
                  <span>Stall Counter Pickup Time</span>
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full text-xs bg-[#FAF7F0] border border-[#E8DFCF] rounded-lg p-2.5 text-[#2A1F18] focus:outline-none focus:border-[#AB6E33]"
                >
                  <option value="Ready in ~6 min (Immediate Walk-up)">Ready in ~6 min (Immediate Walk-up)</option>
                  <option value="In 20 minutes">In 20 minutes</option>
                  <option value="In 45 minutes">In 45 minutes</option>
                  <option value="Sunset Hour (6:30 PM)">Sunset Hour (6:30 PM)</option>
                  <option value="Evening Walk (8:00 PM)">Evening Walk (8:00 PM)</option>
                </select>
              </div>

              {/* Tip Selection */}
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-[#6D5B4D] mb-1.5">
                  <span>Scooper Tip</span>
                  <span className="font-mono text-xs tabular-nums text-[#2A1F18]">${tipAmount.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[0, 10, 15, 20].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setTipPercent(pct)}
                      className={`py-1.5 text-xs font-semibold rounded border transition-colors cursor-pointer ${
                        tipPercent === pct
                          ? 'bg-[#2A1F18] text-white border-[#2A1F18]'
                          : 'bg-[#FAF7F0] text-[#554639] border-[#E8DFCF] hover:bg-[#F0E9DC]'
                      }`}
                    >
                      {pct === 0 ? 'None' : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-[#F2ECE0]">
                <div className="flex justify-between text-[#6D5C4F]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#6D5C4F]">
                  <span>Estimated Tax (8.25%)</span>
                  <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
                </div>
                {tipPercent > 0 && (
                  <div className="flex justify-between text-[#6D5C4F]">
                    <span>Scoop Team Tip</span>
                    <span className="font-mono tabular-nums">${tipAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#2A1F18] pt-2 border-t border-[#F2ECE0]">
                  <span>Total at Stall</span>
                  <span className="font-mono text-base tabular-nums">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                type="button"
                onClick={() => onProceedToCheckout(pickupTime, tipAmount)}
                className="w-full py-3.5 px-4 bg-[#2A1F18] hover:bg-[#3D2E24] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Pickup Order Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-[#8C7A6B]">
                Prepared fresh upon pickup ticket scan at Pier 4 Counter.
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
