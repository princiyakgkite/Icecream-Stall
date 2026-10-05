import React, { useState } from 'react';
import { Plus, Info, Check, Sparkles, Filter } from 'lucide-react';
import { FLAVORS, SIGNATURE_SUNDAES, Flavor, CartItem } from '../data/iceCreamData';

interface MenuSectionProps {
  onAddToCart: (item: CartItem) => void;
  onSelectFlavorDetails: (flavor: Flavor) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onSelectFlavorDetails,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'signature' | 'seasonal' | 'vegan' | 'sundaes'>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'gluten-free' | 'dairy-free'>('all');
  const [addedItemAnimationId, setAddedItemAnimationId] = useState<string | null>(null);

  // Filter flavors
  const filteredFlavors = FLAVORS.filter((flavor) => {
    const matchesCategory =
      activeCategory === 'all'
        ? true
        : activeCategory === 'sundaes'
        ? false
        : flavor.category === activeCategory;

    const matchesDietary =
      dietaryFilter === 'all'
        ? true
        : dietaryFilter === 'gluten-free'
        ? flavor.dietary.includes('Gluten-Free')
        : flavor.dietary.includes('Dairy-Free');

    return matchesCategory && matchesDietary;
  });

  const handleAddScoop = (flavor: Flavor, size: 'Single' | 'Double') => {
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
    setAddedItemAnimationId(`${flavor.id}-${size}`);
    setTimeout(() => setAddedItemAnimationId(null), 1800);
  };

  const handleAddSundae = (sundae: typeof SIGNATURE_SUNDAES[0]) => {
    const cartItem: CartItem = {
      id: `${sundae.id}-${Date.now()}`,
      type: 'sundae',
      title: sundae.name,
      subtitle: 'Artisan Glass Coupe / Takeaway Cup',
      scoops: sundae.scoops.map(s => ({ name: s, color: '#C68A4C' })),
      toppings: sundae.toppings,
      unitPrice: sundae.price,
      quantity: 1,
      image: sundae.image,
    };

    onAddToCart(cartItem);
    setAddedItemAnimationId(sundae.id);
    setTimeout(() => setAddedItemAnimationId(null), 1800);
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A7565] mb-2">
            <span>Slow-Churned Daily Menu</span>
            <span aria-hidden="true">·</span>
            <span>Pier 4 Stall Counter</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1F18] text-balance">
            Today&apos;s Scoops &amp; Sundaes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#615144]">
            Every flavor is made with pasture-raised milk, slow-churned in small batches with zero commercial stabilizers.
          </p>
        </div>

        {/* Filter Bar Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E8DFD0]">
          
          {/* Category Tabs (functional segmented controls) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F4EFE6] rounded-xl border border-[#E3D8C6] w-full sm:w-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white text-[#2A1F18] shadow-sm'
                  : 'text-[#6D5C4E] hover:text-[#2A1F18]'
              }`}
            >
              All Scoops
            </button>
            <button
              onClick={() => setActiveCategory('signature')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'signature'
                  ? 'bg-white text-[#2A1F18] shadow-sm'
                  : 'text-[#6D5C4E] hover:text-[#2A1F18]'
              }`}
            >
              Signatures
            </button>
            <button
              onClick={() => setActiveCategory('seasonal')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'seasonal'
                  ? 'bg-white text-[#2A1F18] shadow-sm'
                  : 'text-[#6D5C4E] hover:text-[#2A1F18]'
              }`}
            >
              Seasonal Churns
            </button>
            <button
              onClick={() => setActiveCategory('vegan')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'vegan'
                  ? 'bg-white text-[#2A1F18] shadow-sm'
                  : 'text-[#6D5C4E] hover:text-[#2A1F18]'
              }`}
            >
              Dairy-Free Sorbet
            </button>
            <button
              onClick={() => setActiveCategory('sundaes')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'sundaes'
                  ? 'bg-white text-[#2A1F18] shadow-sm'
                  : 'text-[#6D5C4E] hover:text-[#2A1F18]'
              }`}
            >
              Signature Sundaes
            </button>
          </div>

          {/* Secondary Dietary Filter */}
          {activeCategory !== 'sundaes' && (
            <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-[#635345]">
              <span className="font-medium">Filter:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setDietaryFilter('all')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    dietaryFilter === 'all'
                      ? 'bg-[#2A1F18] text-white font-medium'
                      : 'bg-[#F2ECE0] text-[#554639] hover:bg-[#EAE1D2]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDietaryFilter('gluten-free')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    dietaryFilter === 'gluten-free'
                      ? 'bg-[#2A1F18] text-white font-medium'
                      : 'bg-[#F2ECE0] text-[#554639] hover:bg-[#EAE1D2]'
                  }`}
                >
                  Gluten-Free Only
                </button>
                <button
                  onClick={() => setDietaryFilter('dairy-free')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    dietaryFilter === 'dairy-free'
                      ? 'bg-[#2A1F18] text-white font-medium'
                      : 'bg-[#F2ECE0] text-[#554639] hover:bg-[#EAE1D2]'
                  }`}
                >
                  Dairy-Free Only
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Flavors Grid (when not purely sundaes) */}
        {activeCategory !== 'sundaes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFlavors.map((flavor) => {
              const isAddedSingle = addedItemAnimationId === `${flavor.id}-Single`;
              const isAddedDouble = addedItemAnimationId === `${flavor.id}-Double`;

              return (
                <div
                  key={flavor.id}
                  className="group bg-[#FAF7F0] rounded-2xl border border-[#E8DFCFC0] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:border-[#D5C6AF]"
                >
                  {/* Top Image Showcase */}
                  <div className="relative aspect-[4/3] bg-[#EFE9DE] overflow-hidden">
                    <img
                      src={flavor.image}
                      alt={flavor.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Subtle status tag in image corner - single tag, no pill clusters */}
                    <div className="absolute top-3 left-3 bg-[#2A1F18]/85 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                      {flavor.status}
                    </div>

                    {/* Flavor color accent chip */}
                    <div
                      className="absolute bottom-3 right-3 w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: flavor.color }}
                      title={`Flavor tone swatch: ${flavor.name}`}
                    />
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div>
                      {/* Clean unboxed metadata kicker */}
                      <div className="flex items-center gap-2 text-xs text-[#7A6757] mb-1.5">
                        <span>{flavor.category === 'seasonal' ? 'Seasonal Small Batch' : flavor.category === 'vegan' ? 'Pure Fruit Sorbet' : 'Signature Churn'}</span>
                        <span aria-hidden="true">·</span>
                        <span>{flavor.fatContent}</span>
                        {flavor.dietary.includes('Gluten-Free') && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>GF</span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-serif-display text-xl font-bold text-[#2A1F18] group-hover:text-[#AB6E33] transition-colors leading-snug">
                        {flavor.name}
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs text-[#5E4E42] mt-1.5 leading-relaxed line-clamp-2">
                        {flavor.tagline}
                      </p>

                      {/* Tasting Notes unboxed chips */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {flavor.tastingNotes.map((note) => (
                          <span
                            key={note}
                            className="text-[11px] text-[#69584B] bg-[#EFE8DC] px-2 py-0.5 rounded"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action & Pricing Row */}
                    <div className="pt-4 border-t border-[#E8DFCF] space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-[#7A6A5C] block">Single Scoop</span>
                          <span className="font-mono text-base font-bold text-[#2A1F18] tabular-nums">
                            ${flavor.pricePerSingle.toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={() => onSelectFlavorDetails(flavor)}
                          className="text-xs text-[#8A663E] hover:text-[#2A1F18] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>Origin &amp; Allergens</span>
                        </button>
                      </div>

                      {/* Dual quick-add buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleAddScoop(flavor, 'Single')}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            isAddedSingle
                              ? 'bg-emerald-700 text-white'
                              : 'bg-[#EAE2D3] hover:bg-[#DDD3C1] text-[#3B2C21]'
                          }`}
                        >
                          {isAddedSingle ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Single · ${flavor.pricePerSingle.toFixed(2)}</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleAddScoop(flavor, 'Double')}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            isAddedDouble
                              ? 'bg-emerald-700 text-white'
                              : 'bg-[#2A1F18] hover:bg-[#3D2E24] text-white'
                          }`}
                        >
                          {isAddedDouble ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Double · ${(flavor.pricePerSingle + 3.5).toFixed(2)}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Signature Sundaes Section */}
        {(activeCategory === 'all' || activeCategory === 'sundaes') && (
          <div className="mt-16 pt-16 border-t border-[#E8DFD0]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A7565] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#AB6E33]" />
                  <span>Stall Creations</span>
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2A1F18]">
                  Signature Sundaes &amp; Tasting Flights
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#665547] max-w-md">
                Assembled to order in chilled vintage glassware or takeaway picnic bowls with warm house toppings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SIGNATURE_SUNDAES.map((sundae) => {
                const isAdded = addedItemAnimationId === sundae.id;
                return (
                  <div
                    key={sundae.id}
                    className="bg-[#FAF7F0] rounded-2xl border border-[#E8DFCF] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
                  >
                    <div className="aspect-[4/3] bg-[#EFE9DE] overflow-hidden">
                      <img
                        src={sundae.image}
                        alt={sundae.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="font-serif-display text-xl font-bold text-[#2A1F18]">
                            {sundae.name}
                          </h4>
                          <span className="font-mono text-base font-bold text-[#2A1F18] tabular-nums">
                            ${sundae.price.toFixed(2)}
                          </span>
                        </div>

                        <p className="text-xs text-[#5A4B3F] leading-relaxed">
                          {sundae.tagline}
                        </p>

                        <div className="mt-4 pt-3 border-t border-[#E8DFCF] text-xs text-[#705F51] space-y-1">
                          <div className="font-semibold text-[#3B2C21]">Includes Scoops:</div>
                          <p className="text-[#615144]">{sundae.scoops.join(' + ')}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddSundae(sundae)}
                        className={`w-full py-2.5 px-4 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#2A1F18] hover:bg-[#3D2E24] text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added to Stall Bag!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add Sundae · ${sundae.price.toFixed(2)}</span>
                          </>
                        )}
                      </button>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
