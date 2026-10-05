import React from 'react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '../data/iceCreamData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FDFBF7] border-b border-[#EDE5D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A7565] mb-2">
              <span>Word from the Cobblestones</span>
              <span aria-hidden="true">·</span>
              <span>4.9 / 5.0 Rating (480+ Reviews)</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#2A1F18]">
              Loved by Food Critics &amp; Pier Locals
            </h2>
          </div>
          <div className="flex items-center gap-1 text-amber-600">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
            ))}
            <span className="text-xs font-bold text-[#2A1F18] ml-2">Top Waterfront Dessert 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="bg-[#FAF7F0] p-6 sm:p-7 rounded-2xl border border-[#E8DFCF] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-[#AB6E33]/40" />
                <p className="text-sm text-[#4D3F34] leading-relaxed italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8DFCF] text-xs">
                <div className="font-bold text-[#2A1F18]">{review.author}</div>
                <div className="text-[#7A6A5C]">{review.role}</div>
                <div className="mt-2 text-[11px] text-[#8C6436] font-medium">
                  Stall favorite: <span className="text-[#2A1F18] font-semibold">{review.favorite}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
