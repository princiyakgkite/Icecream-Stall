import React, { useState } from 'react';
import { Calendar, Users, Sparkles, CheckCircle2, Clock, Send, ShieldCheck } from 'lucide-react';

export const CateringCartSection: React.FC = () => {
  const [guestCount, setGuestCount] = useState<number>(85);
  const [serviceHours, setServiceHours] = useState<number>(3);
  const [flavorCount, setFlavorCount] = useState<number>(4);
  const [includeWaffleIrons, setIncludeWaffleIrons] = useState<boolean>(true);

  // Form submission state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactDate, setContactDate] = useState('2026-10-24');
  const [submittedBooking, setSubmittedBooking] = useState<{
    code: string;
    guestCount: number;
    quote: number;
  } | null>(null);

  // Quote calculation
  const baseCartFee = 350; // Cart setup, umbrella, vintage brass details
  const pricePerGuest = includeWaffleIrons ? 7.25 : 6.00;
  const hourFee = (serviceHours - 2) * 90;
  const flavorFee = (flavorCount - 3) * 45;
  const estimatedTotal = baseCartFee + Math.round(guestCount * pricePerGuest) + hourFee + flavorFee;

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;

    setSubmittedBooking({
      code: `CART-${Math.floor(1000 + Math.random() * 9000)}`,
      guestCount,
      quote: estimatedTotal,
    });
  };

  return (
    <section id="catering" className="py-16 sm:py-24 bg-[#FDFBF7] border-b border-[#EDE5D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A7565] mb-2">
            <span>Mobile Ice Cream Cart &amp; Stall Catering</span>
            <span aria-hidden="true">·</span>
            <span>Weddings &amp; Private Soirées</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1F18] leading-tight">
            Bring Our Vintage Stall to Your Celebration
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#615144]">
            Our restored 1952 ice cream bicycle cart, complete with striped canopy, brass churn lids, and hand-pressed waffle irons right on your lawn.
          </p>
        </div>

        {/* 2-Column Split: Visual Image & Interactive Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Vintage Cart Imagery & Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#E5DAC8] shadow-md aspect-[16/10] bg-[#EFE8DC]">
              <img
                src="/src/assets/images/stall_catering_cart_1791181477235.jpg"
                alt="Aesthetic boutique vintage mobile ice cream cart stationed at outdoor garden celebration with striped canopy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <span className="font-serif-display text-lg font-bold block">The Heritage Cart Service</span>
                <span className="text-[#EADFCF]">Fully self-powered · No electrical plug required for 6 hours</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-left">
              <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#E9DFCE]">
                <span className="font-serif-display text-lg font-bold text-[#2A1F18] block">2 Scoopers</span>
                <span className="text-xs text-[#705F51]">Attired in linen aprons</span>
              </div>
              <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#E9DFCE]">
                <span className="font-serif-display text-lg font-bold text-[#2A1F18] block">Unlimited</span>
                <span className="text-xs text-[#705F51]">Warm waffle cones</span>
              </div>
              <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#E9DFCE]">
                <span className="font-serif-display text-lg font-bold text-[#2A1F18] block">Compostable</span>
                <span className="text-xs text-[#705F51]">Zero waste service</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Catering Quote Estimator */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E3D8C6] shadow-sm space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE5D5]">
              <h3 className="font-serif-display text-xl font-bold text-[#2A1F18]">
                Instant Event Quote Estimator
              </h3>
              <div className="text-right">
                <span className="text-xs text-[#8A7361] block">Estimated Total</span>
                <span className="font-mono text-2xl font-bold text-[#2A1F18] tabular-nums">
                  ${estimatedTotal}
                </span>
              </div>
            </div>

            {submittedBooking ? (
              <div className="bg-[#FCFAF5] border border-[#AB6E33]/40 rounded-xl p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif-display text-xl font-bold text-[#2A1F18]">
                  Date Reservation Request Received
                </h4>
                <p className="text-xs text-[#635345] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#2A1F18]">{contactName}</strong>. Our stall catering coordinator will confirm availability for <strong className="text-[#2A1F18]">{contactDate}</strong> via {contactEmail} within 4 business hours.
                </p>
                <div className="p-3 bg-white rounded-lg border border-[#EADFCF] inline-block text-xs font-mono font-bold text-[#AB6E33]">
                  Reservation Ticket: {submittedBooking.code}
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmittedBooking(null)}
                    className="text-xs text-[#8C6436] hover:underline cursor-pointer"
                  >
                    Adjust Quote or Request Another Date
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-5">
                
                {/* Guest Count Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#5A493B] mb-2">
                    <span>Expected Guests: <strong className="text-[#2A1F18] font-mono text-sm">{guestCount}</strong></span>
                    <span className="text-[#8A7565]">25 – 350+ guests</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="350"
                    step="5"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full accent-[#2A1F18] cursor-pointer"
                  />
                </div>

                {/* Service Hours Buttons */}
                <div>
                  <label className="text-xs font-semibold text-[#5A493B] block mb-2">
                    Service Duration
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[2, 3, 4].map((hours) => (
                      <button
                        key={hours}
                        type="button"
                        onClick={() => setServiceHours(hours)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          serviceHours === hours
                            ? 'bg-[#2A1F18] text-white border-[#2A1F18]'
                            : 'bg-[#FAF7F0] text-[#554639] border-[#E8DFCF] hover:bg-[#F2ECE0]'
                        }`}
                      >
                        {hours} Hours Scooping
                      </button>
                    ))}
                  </div>
                </div>

                {/* Flavors in Cart */}
                <div>
                  <label className="text-xs font-semibold text-[#5A493B] block mb-2">
                    Flavors in Mobile Cart
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[3, 4, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFlavorCount(num)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          flavorCount === num
                            ? 'bg-[#2A1F18] text-white border-[#2A1F18]'
                            : 'bg-[#FAF7F0] text-[#554639] border-[#E8DFCF] hover:bg-[#F2ECE0]'
                        }`}
                      >
                        {num} Artisan Flavors
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Waffle Iron Toggle */}
                <div className="flex items-center justify-between p-3 bg-[#FAF7F0] rounded-xl border border-[#E8DFCF]">
                  <div>
                    <span className="text-xs font-bold text-[#2A1F18] block">Live Waffle Press Station</span>
                    <span className="text-[11px] text-[#705F51]">Cones rolled fresh on site for guests (+$1.25/guest)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeWaffleIrons}
                    onChange={(e) => setIncludeWaffleIrons(e.target.checked)}
                    className="w-4 h-4 accent-[#2A1F18] rounded cursor-pointer"
                  />
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-xs font-medium text-[#655447] block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Clara Henderson"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F0] border border-[#E8DFCF] rounded-lg text-[#2A1F18] focus:outline-none focus:border-[#AB6E33]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#655447] block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="clara@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F0] border border-[#E8DFCF] rounded-lg text-[#2A1F18] focus:outline-none focus:border-[#AB6E33]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#655447] block mb-1">Event Date</label>
                  <input
                    type="date"
                    required
                    value={contactDate}
                    onChange={(e) => setContactDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F0] border border-[#E8DFCF] rounded-lg text-[#2A1F18] focus:outline-none focus:border-[#AB6E33]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#2A1F18] hover:bg-[#3D2E24] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Send className="w-4 h-4 text-[#F7F3EB]" />
                  <span>Reserve Date &amp; Request Cart Booking</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
