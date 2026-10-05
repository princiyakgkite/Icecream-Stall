import React, { useState } from 'react';
import { MapPin, Clock, SunMedium, BellRing, Navigation, CheckCircle2 } from 'lucide-react';
import { STALL_LOCATIONS, StallSchedule } from '../data/iceCreamData';

export const LiveStallTracker: React.FC = () => {
  const [selectedStall, setSelectedStall] = useState<StallSchedule>(STALL_LOCATIONS[0]);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="stall-location" className="py-12 bg-[#F7F3EB] border-b border-[#E8DFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A7565] mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Live Stall Coordinates &amp; Schedule</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2A1F18]">
              Where We&apos;re Scooping This Week
            </h2>
          </div>
          <p className="text-sm text-[#665547] max-w-md">
            Our heritage timber kiosk and mobile vintage cart travel between prime outdoor community hubs.
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {STALL_LOCATIONS.map((stall) => {
            const isSelected = selectedStall.day === stall.day;
            return (
              <div
                key={stall.day}
                onClick={() => setSelectedStall(stall)}
                className={`p-6 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-white border-[#AB6E33] shadow-md ring-1 ring-[#AB6E33]/30'
                    : 'bg-[#FAF7F0] border-[#E5DAC8] hover:border-[#D5C6AF] hover:bg-white'
                }`}
              >
                {/* Stall Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#8C6D46] tracking-wide">
                    {stall.day} ({stall.dateStr})
                  </span>
                  
                  {stall.isToday ? (
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                      Open Today
                    </span>
                  ) : (
                    <span className="text-xs text-[#7A6B5E] bg-[#EFE8DC] px-2 py-0.5 rounded">
                      Upcoming
                    </span>
                  )}
                </div>

                <h3 className="font-serif-display text-lg font-bold text-[#2A1F18] mb-1.5">
                  {stall.locationName}
                </h3>
                
                <p className="text-xs text-[#635345] mb-4 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#AB6E33] shrink-0 mt-0.5" />
                  <span>{stall.address}</span>
                </p>

                <div className="pt-3 border-t border-[#EDE5D5] flex items-center justify-between text-xs text-[#524438]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#8A7565]" />
                    <span className="font-medium">{stall.hours}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#7A695A]">
                    <SunMedium className="w-3 h-3 text-amber-600" />
                    <span>72°F</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Selected Stall Detailed Showcase Card */}
        <div className="mt-8 bg-white border border-[#E3D7C5] rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B5A4B]">
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Counter Open for Walk-ins &amp; Online Pickup
                </span>
                <span aria-hidden="true">·</span>
                <span>Avg wait time: ~4 minutes</span>
                <span aria-hidden="true">·</span>
                <span>Waffle batch ready in 8 min</span>
              </div>

              <h3 className="font-serif-display text-2xl font-bold text-[#2A1F18]">
                {selectedStall.locationName}
              </h3>
              
              <p className="text-sm text-[#5C4D40] leading-relaxed">
                Positioned by the dockside promenade. Ample shaded park benches, bicycle parking racks, and a direct sea breeze view. Today scooping 8 small-batch churns including our award-winning Bronte Pistachio and Roasted Strawberry Balsamic.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
                <button
                  onClick={() => handleCopyAddress(selectedStall.address)}
                  className="px-4 py-2 bg-[#F5EFE4] hover:bg-[#ECE4D5] text-[#362A20] font-semibold rounded-lg border border-[#DDD0BC] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {copiedAddress ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4 text-[#AB6E33]" />
                      <span>Copy Exact Directions</span>
                    </>
                  )}
                </button>

                <div className="text-[#7A695B]">
                  Stall Counter Phone: <span className="font-mono text-[#2A1F18] font-semibold">(415) 890-4421</span>
                </div>
              </div>

            </div>

            {/* Right Fresh Churn Badge */}
            <div className="lg:col-span-4 bg-[#FCFAF5] border border-[#E9E0CE] rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#AB6E33]">
                <BellRing className="w-4 h-4 text-[#AB6E33]" />
                <span>Live Stall Churn Board</span>
              </div>
              
              <div className="space-y-2 text-xs text-[#524438]">
                <div className="flex justify-between pb-1.5 border-b border-[#EFE8DA]">
                  <span className="font-medium text-[#2A1F18]">Roasted Strawberry Balsamic</span>
                  <span className="text-emerald-700 font-semibold">Fresh Churn 18m ago</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-[#EFE8DA]">
                  <span className="font-medium text-[#2A1F18]">Tahitian Vanilla Honeycomb</span>
                  <span className="text-amber-700 font-semibold">Churning now</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-[#2A1F18]">House Waffle Cones</span>
                  <span className="text-emerald-700 font-semibold">Baking continuous</span>
                </div>
              </div>

              <p className="text-[11px] text-[#867566] italic pt-1">
                * Batches are spun in 4-gallon drums to retain micro-crystal smoothness.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
