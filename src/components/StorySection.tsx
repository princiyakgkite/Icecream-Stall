import React from 'react';
import { Milk, Flame, Wheat, Leaf } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-16 sm:py-24 bg-[#F8F5EE] border-b border-[#E8DFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subheader */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A7565] mb-2">
            <span>The Slow-Churn Standard</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2021</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1F18]">
            Crafted for the Purest Scoop
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#615144]">
            Most commercial ice cream pumps in 50% air and artificial gums. We believe in high-butterfat Jersey cream, slow copper pots, and real botanical extracts.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-[#E5DAC8] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] flex items-center justify-center text-[#AB6E33]">
              <Milk className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-[#2A1F18]">
              Meadowood Jersey Milk
            </h3>
            <p className="text-xs text-[#635345] leading-relaxed">
              100% pasture-grazed Jersey cow milk known for its naturally rich golden cream layer and 15% native butterfat content.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5DAC8] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] flex items-center justify-center text-[#AB6E33]">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-[#2A1F18]">
              French Copper Kettle
            </h3>
            <p className="text-xs text-[#635345] leading-relaxed">
              Our caramels, fudges, and berry reductions are caramelized in unlined copper kettles to achieve authentic nuttyMaillard notes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5DAC8] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] flex items-center justify-center text-[#AB6E33]">
              <Wheat className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-[#2A1F18]">
              Warm Rolled Waffles
            </h3>
            <p className="text-xs text-[#635345] leading-relaxed">
              Waffle cones aren&apos;t pulled out of cardboard boxes. We pour brown butter batter onto cast irons at the stall counter every 20 minutes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5DAC8] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] flex items-center justify-center text-[#AB6E33]">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-[#2A1F18]">
              Zero-Waste Stall
            </h3>
            <p className="text-xs text-[#635345] leading-relaxed">
              All cups, birch tasting spoons, and napkins are 100% BPI-certified compostable. Even our solar panels power the cart refrigeration.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
