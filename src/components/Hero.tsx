import React, { useState } from 'react';
import { ArrowRight, Compass, Sparkles, Award } from 'lucide-react';
import heroStallImg from '../assets/images/hero_icecream_stall_1791181409583.jpg';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onQuickOrderPistachio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onQuickOrderPistachio }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#FDFBF7] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#EDE5D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle unboxed metadata kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A7565] mb-4">
          <span>Jersey Cow Organic Dairy</span>
          <span aria-hidden="true">·</span>
          <span>14.5% Slow Churned</span>
          <span aria-hidden="true">·</span>
          <span>Warm Waffle Irons Daily</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-700 font-bold">Harbor Pier 4 Stall Active</span>
        </div>

        {/* Main 2-column or split architectural hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#2A1F18] leading-[1.12] tracking-tight text-balance">
              Small-batch ice cream churned at the waterfront stall.
            </h1>

            <p className="text-base sm:text-lg text-[#5D4E42] leading-relaxed max-w-xl">
              We slow-churn 100% pasture-raised Jersey milk every morning, pouring molten amber caramels and folding freshly roasted Sicilian nuts into cones pressed warm before your eyes.
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onNavigate('menu')}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#2A1F18] hover:bg-[#3D2E24] active:scale-[0.99] rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Daily Scoops</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => onNavigate('scoop-lab')}
                className="px-6 py-3.5 text-sm font-semibold text-[#3B2C21] bg-[#F3ECDF] hover:bg-[#EAE0D0] border border-[#DDD3C1] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Build Custom Cone</span>
              </button>
            </div>

            {/* Key trust markers - unboxed clean presentation */}
            <div className="pt-4 border-t border-[#ECE3D4] grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block font-serif-display text-xl sm:text-2xl font-bold text-[#2A1F18]">
                  100%
                </span>
                <span className="text-xs text-[#705E50] leading-tight">
                  Pasture Jersey Milk
                </span>
              </div>
              <div>
                <span className="block font-serif-display text-xl sm:text-2xl font-bold text-[#2A1F18]">
                  90 min
                </span>
                <span className="text-xs text-[#705E50] leading-tight">
                  Fresh Batch Cycles
                </span>
              </div>
              <div>
                <span className="block font-serif-display text-xl sm:text-2xl font-bold text-[#2A1F18]">
                  Zero
                </span>
                <span className="text-xs text-[#705E50] leading-tight">
                  Artificial Gums &amp; Flavors
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E8DFD0] bg-[#EFE9DE] aspect-[16/10] sm:aspect-[16/10]">
              
              {/* Fallback styling container */}
              {!imgLoaded && !imgError && (
                <div className="absolute inset-0 bg-[#E8E0D1] animate-pulse flex items-center justify-center text-xs text-[#8A7A6C]">
                  Loading stall photo...
                </div>
              )}

              {imgError ? (
                <div className="absolute inset-0 bg-gradient-to-br from-[#EFE5D5] to-[#E3D4BE] flex flex-col items-center justify-center p-8 text-center">
                  <span className="font-serif-display text-2xl font-bold text-[#3B2C21] mb-2">Velvet &amp; Scoop Stall</span>
                  <p className="text-xs text-[#7A6858]">Handcrafted ice cream stall stationed at Pier 4 Promenade</p>
                </div>
              ) : (
                <img
                  src={heroStallImg}
                  alt="Charming artisan ice cream stall kiosk with striped awning at golden hour on cobblestone promenade"
                  referrerPolicy="no-referrer"
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgError(true)}
                  className={`w-full h-full object-cover object-center transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
              )}

              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

              {/* Scrim Overlay card info */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-white">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-200 mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
                    <span>Now Serving at Waterfront Gate</span>
                  </div>
                  <h2 className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight">
                    Pier 4 Promenade Stall
                  </h2>
                  <p className="text-xs text-[#EAE2D8] mt-0.5">
                    Fresh waffles baking every 20 minutes · Outdoor deck seating
                  </p>
                </div>

                <button
                  onClick={onQuickOrderPistachio}
                  className="px-4 py-2 text-xs font-semibold text-[#2A1F18] bg-white hover:bg-[#F7F3EB] rounded-lg shadow-md transition-all cursor-pointer whitespace-nowrap self-stretch sm:self-auto"
                >
                  Order Daily Special · $5.75
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
