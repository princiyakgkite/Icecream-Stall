import React, { useState } from 'react';
import { X, CheckCircle2, Clock, MapPin, QrCode, Sparkles, ChefHat } from 'lucide-react';
import { CartItem } from '../data/iceCreamData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  pickupTime: string;
  tipAmount: number;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  pickupTime,
  tipAmount,
  onOrderCompleted,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupNotes, setPickupNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'counter' | 'card'>('counter');
  
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    customerName: string;
    itemsCount: number;
    totalAmount: number;
    pickupTime: string;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = subtotal * 0.0825;
  const grandTotal = subtotal + tipAmount + tax;
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName) return;

    const randomId = `VS-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrder({
      orderId: randomId,
      customerName,
      itemsCount: totalItemCount,
      totalAmount: grandTotal,
      pickupTime,
    });
    onOrderCompleted();
  };

  const handleFinish = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-[#FAF7F0] w-full max-w-lg rounded-2xl border border-[#E8DFCF] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#E8DFCF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-[#AB6E33]" />
            <h3 className="font-serif-display text-xl font-bold text-[#2A1F18]">
              {confirmedOrder ? 'Order Confirmed!' : 'Stall Pickup Checkout'}
            </h3>
          </div>
          <button
            onClick={confirmedOrder ? handleFinish : onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full hover:bg-[#F2ECE0] flex items-center justify-center text-[#6A5A4D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {confirmedOrder ? (
            /* Post-Order Confirmation View */
            <div className="space-y-6 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#8A7565] font-semibold block mb-1">
                  Pier 4 Stall Counter Order
                </span>
                <h4 className="font-serif-display text-2xl font-bold text-[#2A1F18]">
                  Order Ticket #{confirmedOrder.orderId}
                </h4>
                <p className="text-xs text-[#635345] mt-1">
                  Thank you, {confirmedOrder.customerName}. We are rolling your waffle cones now.
                </p>
              </div>

              {/* Barcode / QR Simulation for pickup shelf scan */}
              <div className="bg-white p-5 rounded-xl border border-[#E5DAC8] inline-flex flex-col items-center space-y-3">
                <QrCode className="w-24 h-24 text-[#2A1F18]" />
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#786757]">
                  {confirmedOrder.orderId}
                </span>
                <span className="text-[10px] text-[#8C7A6B]">
                  Present this screen at Pier 4 Stall Counter
                </span>
              </div>

              {/* Status Stepper */}
              <div className="bg-white p-4 rounded-xl border border-[#E8DFCF] text-left text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  <span>Status: Transmitted to Stall Bain-Marie &amp; Scoopers</span>
                </div>
                <div className="flex items-center gap-2 text-[#5E4E42]">
                  <Clock className="w-3.5 h-3.5 text-[#AB6E33]" />
                  <span>Target Pickup: <strong>{confirmedOrder.pickupTime}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-[#5E4E42]">
                  <MapPin className="w-3.5 h-3.5 text-[#AB6E33]" />
                  <span>Location: Harbor Promenade Pier 4 (Near Gate B)</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3 px-4 bg-[#2A1F18] hover:bg-[#3D2E24] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Done · Back to Menu
              </button>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              
              {/* Pickup Time confirmation banner */}
              <div className="p-3 bg-[#FAF7F0] border border-[#E8DFCF] rounded-xl flex items-center justify-between text-xs text-[#5E4E42]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#AB6E33]" />
                  <span>Pickup: <strong>{pickupTime}</strong></span>
                </div>
                <span className="text-[11px] text-[#8C7A6B]">Pier 4 Stall Counter</span>
              </div>

              {/* Input fields */}
              <div>
                <label className="text-xs font-semibold text-[#5A493B] block mb-1">
                  Your Name (for order callout)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Leo Sterling"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8DFCF] rounded-lg text-[#2A1F18] focus:outline-none focus:border-[#AB6E33]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5A493B] block mb-1">
                  Mobile Number (Optional for SMS ready notification)
                </label>
                <input
                  type="tel"
                  placeholder="(415) 000-0000"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8DFCF] rounded-lg text-[#2A1F18] focus:outline-none focus:border-[#AB6E33]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5A493B] block mb-1">
                  Special Notes for Scooper
                </label>
                <input
                  type="text"
                  placeholder="e.g. Extra napkins, allergy separate scoop, etc."
                  value={pickupNotes}
                  onChange={(e) => setPickupNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8DFCF] rounded-lg text-[#2A1F18] focus:outline-none focus:border-[#AB6E33]"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="text-xs font-semibold text-[#5A493B] block mb-1.5">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div
                    onClick={() => setPaymentMethod('counter')}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                      paymentMethod === 'counter'
                        ? 'bg-white border-[#AB6E33] ring-1 ring-[#AB6E33]/30 font-semibold'
                        : 'bg-[#FAF7F0] border-[#E8DFCF] text-[#69584B]'
                    }`}
                  >
                    <div>Pay at Stall Counter</div>
                    <div className="text-[10px] text-[#867566] font-normal">Card, Apple Pay, Cash</div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-white border-[#AB6E33] ring-1 ring-[#AB6E33]/30 font-semibold'
                        : 'bg-[#FAF7F0] border-[#E8DFCF] text-[#69584B]'
                    }`}
                  >
                    <div>Online Contactless</div>
                    <div className="text-[10px] text-[#867566] font-normal">Instant pre-authorized</div>
                  </div>
                </div>
              </div>

              {/* Order Summary Strip */}
              <div className="pt-3 border-t border-[#E8DFCF] flex items-center justify-between text-xs">
                <span className="text-[#69584B]">
                  Total ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}):
                </span>
                <span className="font-mono text-base font-bold text-[#2A1F18] tabular-nums">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#2A1F18] hover:bg-[#3D2E24] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Confirm Stall Pickup Order</span>
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
