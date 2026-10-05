import React, { useState } from 'react';
import { Sparkles, Check, Plus, AlertCircle, ShoppingBag, RotateCcw } from 'lucide-react';
import { FLAVORS, VESSELS, TOPPINGS, Vessel, Flavor, Topping, CartItem } from '../data/iceCreamData';

interface ScoopLabProps {
  onAddToCart: (item: CartItem) => void;
}

export const ScoopLab: React.FC<ScoopLabProps> = ({ onAddToCart }) => {
  const [selectedVessel, setSelectedVessel] = useState<Vessel>(VESSELS[0]);
  const [scoopCount, setScoopCount] = useState<1 | 2 | 3>(2);
  const [selectedScoopIds, setSelectedScoopIds] = useState<string[]>([
    'sicilian-pistachio',
    'strawberry-balsamic',
  ]);
  const [selectedToppingIds, setSelectedToppingIds] = useState<string[]>([
    'honeycomb-brittle',
    'valrhona-hot-fudge',
  ]);
  const [customName, setCustomName] = useState<string>('My Seaside Masterpiece');
  const [justAdded, setJustAdded] = useState(false);

  // Handle scoop flavor change for a specific index
  const handleSetScoopFlavor = (index: number, flavorId: string) => {
    const updated = [...selectedScoopIds];
    updated[index] = flavorId;
    setSelectedScoopIds(updated);
  };

  // Adjust scoop count
  const handleScoopCountChange = (count: 1 | 2 | 3) => {
    setScoopCount(count);
    if (count === 1) {
      setSelectedScoopIds([selectedScoopIds[0] || FLAVORS[0].id]);
    } else if (count === 2) {
      setSelectedScoopIds([
        selectedScoopIds[0] || FLAVORS[0].id,
        selectedScoopIds[1] || FLAVORS[1].id,
      ]);
    } else if (count === 3) {
      setSelectedScoopIds([
        selectedScoopIds[0] || FLAVORS[0].id,
        selectedScoopIds[1] || FLAVORS[1].id,
        selectedScoopIds[2] || FLAVORS[2].id,
      ]);
    }
  };

  // Toggle toppings
  const handleToggleTopping = (toppingId: string) => {
    if (selectedToppingIds.includes(toppingId)) {
      setSelectedToppingIds(selectedToppingIds.filter((id) => id !== toppingId));
    } else {
      setSelectedToppingIds([...selectedToppingIds, toppingId]);
    }
  };

  // Calculate price
  const baseScoopPrice = scoopCount === 1 ? 5.50 : scoopCount === 2 ? 8.75 : 11.50;
  const vesselPrice = selectedVessel.price;
  const toppingsPrice = selectedToppingIds.reduce((sum, id) => {
    const t = TOPPINGS.find((top) => top.id === id);
    return sum + (t ? t.price : 0);
  }, 0);
  const totalPrice = baseScoopPrice + vesselPrice + toppingsPrice;

  // Selected flavor objects
  const selectedFlavors = selectedScoopIds.map((id) => {
    return FLAVORS.find((f) => f.id === id) || FLAVORS[0];
  });

  // Calculate aggregated allergens
  const aggregatedAllergens = Array.from(
    new Set([
      ...selectedFlavors.flatMap((f) => f.allergens),
      selectedVessel.dietary.includes('Gluten') ? 'Gluten' : '',
      selectedVessel.dietary.includes('Sesame') ? 'Sesame' : '',
    ].filter(Boolean))
  );

  const handleAddCustomToCart = () => {
    const cartItem: CartItem = {
      id: `custom-${Date.now()}`,
      type: 'custom_builder',
      title: customName.trim() || 'Custom Scoop Creation',
      subtitle: `${scoopCount} Scoops in ${selectedVessel.name}`,
      vessel: selectedVessel.name,
      scoops: selectedFlavors.map((f) => ({ name: f.name, color: f.color })),
      toppings: selectedToppingIds.map((tid) => {
        const top = TOPPINGS.find((t) => t.id === tid);
        return top ? top.name : tid;
      }),
      unitPrice: totalPrice,
      quantity: 1,
      image: selectedFlavors[0]?.image || '/src/assets/images/scoop_pistachio_cone_1791181432859.jpg',
    };

    onAddToCart(cartItem);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleReset = () => {
    setSelectedVessel(VESSELS[0]);
    handleScoopCountChange(2);
    setSelectedScoopIds([FLAVORS[0].id, FLAVORS[1].id]);
    setSelectedToppingIds(['honeycomb-brittle', 'valrhona-hot-fudge']);
    setCustomName('My Seaside Masterpiece');
  };

  return (
    <section id="scoop-lab" className="py-16 sm:py-24 bg-[#F5EFE4] border-t border-b border-[#E8DFCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A7565] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#AB6E33]" />
              <span>Interactive Stall Counter</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1F18]">
              The Scoop Lab
            </h2>
          </div>
          <p className="text-sm text-[#635345] max-w-md">
            Stack your preferred vessels, fresh-churned batches, and warm stall drizzles into a customized cone or sundae.
          </p>
        </div>

        {/* Builder Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: The Configurator Controls */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#E3D8C6] shadow-sm">
            
            {/* Step 1: Vessel Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A7361]">
                  1. Choose Your Vessel
                </label>
                <span className="text-xs text-[#6F5D4E]">{selectedVessel.name}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VESSELS.map((vessel) => {
                  const isSelected = selectedVessel.id === vessel.id;
                  return (
                    <div
                      key={vessel.id}
                      onClick={() => setSelectedVessel(vessel)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#FCFAF5] border-[#AB6E33] ring-1 ring-[#AB6E33]/30 shadow-xs'
                          : 'bg-[#FAF7F0] border-[#E8DFCF] hover:border-[#D5C6AF]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#2A1F18]">{vessel.name}</span>
                        <span className="font-mono text-xs font-bold text-[#8C6436]">
                          {vessel.price === 0 ? 'Free' : `+$${vessel.price.toFixed(2)}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#69584B] leading-snug line-clamp-2">
                        {vessel.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scoop Count Stepper */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A7361]">
                  2. Scoop Count
                </label>
                <span className="text-xs text-[#705F51]">
                  {scoopCount === 1 ? 'Single ($5.50)' : scoopCount === 2 ? 'Double ($8.75)' : 'Triple ($11.50)'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => handleScoopCountChange(count as 1 | 2 | 3)}
                    className={`py-2.5 px-4 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      scoopCount === count
                        ? 'bg-[#2A1F18] text-white border-[#2A1F18] shadow-sm'
                        : 'bg-[#FAF7F0] text-[#4A3B2F] border-[#E8DFCF] hover:bg-[#F2ECE0]'
                    }`}
                  >
                    {count === 1 ? 'Single Scoop' : count === 2 ? 'Double Scoop' : 'Triple Tower'}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Choose Flavor for Each Scoop Slot */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8A7361] block">
                3. Select Flavor for Each Scoop
              </label>

              {Array.from({ length: scoopCount }).map((_, index) => {
                const currentFlavorId = selectedScoopIds[index] || FLAVORS[0].id;
                const currentFlavor = FLAVORS.find((f) => f.id === currentFlavorId) || FLAVORS[0];

                return (
                  <div key={index} className="p-3.5 bg-[#FAF7F0] rounded-xl border border-[#E8DFCF] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#5A493B]">
                        Scoop #{index + 1} ({index === 0 ? 'Base Scoop' : index === 1 ? 'Middle Scoop' : 'Crown Scoop'})
                      </span>
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded"
                        style={{ backgroundColor: `${currentFlavor.color}30`, color: '#2A1F18' }}
                      >
                        {currentFlavor.name}
                      </span>
                    </div>

                    {/* Flavor selection scroller */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {FLAVORS.map((flavor) => {
                        const isSelectedFlavor = currentFlavorId === flavor.id;
                        return (
                          <button
                            key={flavor.id}
                            type="button"
                            onClick={() => handleSetScoopFlavor(index, flavor.id)}
                            className={`p-2 rounded-lg text-left text-xs transition-all border cursor-pointer ${
                              isSelectedFlavor
                                ? 'bg-white border-[#AB6E33] shadow-xs ring-1 ring-[#AB6E33]/30 font-semibold'
                                : 'bg-[#F5EFE4] border-transparent hover:bg-white text-[#524335]'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: flavor.color }}
                              />
                              <span className="truncate text-[11px]">{flavor.name}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step 4: Drizzles & Crunch Toppings */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A7361]">
                  4. Warm Drizzles &amp; Artisan Crunches
                </label>
                <span className="text-xs text-[#705F51]">{selectedToppingIds.length} Selected</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {TOPPINGS.map((top) => {
                  const isChecked = selectedToppingIds.includes(top.id);
                  return (
                    <div
                      key={top.id}
                      onClick={() => handleToggleTopping(top.id)}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#FCFAF5] border-[#AB6E33] ring-1 ring-[#AB6E33]/30'
                          : 'bg-[#FAF7F0] border-[#E8DFCF] hover:border-[#D5C6AF]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#2A1F18] truncate pr-1">
                          {top.name}
                        </span>
                        {isChecked ? (
                          <Check className="w-3.5 h-3.5 text-[#AB6E33] shrink-0" />
                        ) : (
                          <span className="text-[11px] font-mono text-[#8C6436] shrink-0">
                            +${top.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#786657] mt-0.5 truncate">
                        {top.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Name Input */}
            <div className="pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8A7361] block mb-1.5">
                Name Your Creation (Optional)
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                maxLength={40}
                placeholder="e.g. Afternoon Cobblestone Drift"
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F0] border border-[#E8DFCF] rounded-lg text-[#2A1F18] focus:outline-none focus:border-[#AB6E33] focus:ring-1 focus:ring-[#AB6E33]"
              />
            </div>

          </div>

          {/* RIGHT 5 COLS: Dynamic Visual Preview & Stacking Canvas */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3D8C6] shadow-md flex flex-col items-center">
              
              <div className="w-full flex items-center justify-between text-xs text-[#8A7361] mb-4 pb-2 border-b border-[#EDE5D5]">
                <span className="font-semibold uppercase tracking-wider">Live Stack Preview</span>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 hover:text-[#2A1F18] transition-colors cursor-pointer text-[11px]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Dynamic Cone / Cup Visual Illustration */}
              <div className="relative w-64 h-72 flex flex-col items-center justify-end py-4">
                
                {/* Topping flakes / drizzle visual effect overlay */}
                {selectedToppingIds.length > 0 && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 pointer-events-none">
                    <span className="text-[10px] font-semibold bg-[#2A1F18]/85 text-white px-2 py-0.5 rounded shadow-sm">
                      Drizzled &amp; Topped
                    </span>
                  </div>
                )}

                {/* Stacked Scoops */}
                <div className="flex flex-col-reverse items-center -space-y-6 z-20">
                  {selectedFlavors.map((flavor, i) => {
                    const sizeClass =
                      i === 0
                        ? 'w-24 h-24'
                        : i === 1
                        ? 'w-22 h-22 -mb-5'
                        : 'w-20 h-20 -mb-5';

                    return (
                      <div
                        key={i}
                        className={`relative rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${sizeClass}`}
                        style={{
                          backgroundColor: flavor.color,
                          boxShadow: 'inset 0 -8px 12px rgba(0,0,0,0.18), 0 4px 10px rgba(0,0,0,0.12)',
                        }}
                      >
                        {/* Ice cream texture ripple highlights */}
                        <div className="absolute inset-1 rounded-full border border-white/25 pointer-events-none" />
                        <div className="absolute top-2 left-4 w-4 h-2 rounded-full bg-white/40 blur-[1px] pointer-events-none" />
                        
                        {/* Label chip on hover/view */}
                        <span className="text-[9px] font-bold text-white/90 text-center px-1 drop-shadow-sm select-none">
                          {flavor.name.split(' ')[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Vessel Base Illustration */}
                <div className="z-10 mt-[-10px] flex flex-col items-center">
                  {selectedVessel.iconType === 'waffle' && (
                    <div 
                      className="w-20 h-28 bg-gradient-to-b from-[#C48C46] to-[#9E6523] clip-cone shadow-lg flex items-center justify-center relative"
                      style={{
                        clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                        backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 4px, transparent 4px, transparent 8px)',
                      }}
                    />
                  )}

                  {selectedVessel.iconType === 'sesame' && (
                    <div 
                      className="w-20 h-28 bg-gradient-to-b from-[#4A4742] to-[#2B2926] clip-cone shadow-lg flex items-center justify-center relative"
                      style={{
                        clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                        backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 3px, transparent 3px, transparent 7px)',
                      }}
                    />
                  )}

                  {selectedVessel.iconType === 'brioche' && (
                    <div className="w-28 h-14 bg-gradient-to-b from-[#DE9B3A] to-[#B36F15] rounded-b-2xl shadow-md border-t-2 border-[#FFE8BF]" />
                  )}

                  {selectedVessel.iconType === 'cup' && (
                    <div className="w-24 h-16 bg-gradient-to-b from-[#F2ECE1] to-[#E2D6C0] rounded-b-lg border border-[#CEC1A8] shadow-md flex items-center justify-center text-[10px] font-serif text-[#786553]">
                      Velvet &amp; Scoop
                    </div>
                  )}
                </div>

              </div>

              {/* Recipe Breakdown Box */}
              <div className="w-full bg-[#FAF7F0] border border-[#E8DFCF] rounded-xl p-4 mt-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#2A1F18] font-bold">
                  <span>{customName || 'Custom Creation'}</span>
                  <span className="font-mono text-sm tabular-nums">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="text-[11px] text-[#635345] space-y-1">
                  <div><span className="font-medium text-[#2A1F18]">Vessel:</span> {selectedVessel.name}</div>
                  <div><span className="font-medium text-[#2A1F18]">Scoops:</span> {selectedFlavors.map(f => f.name).join(' · ')}</div>
                  {selectedToppingIds.length > 0 && (
                    <div>
                      <span className="font-medium text-[#2A1F18]">Toppings:</span>{' '}
                      {selectedToppingIds.map(tid => TOPPINGS.find(t => t.id === tid)?.name).join(', ')}
                    </div>
                  )}
                </div>

                {/* Allergen disclosure */}
                {aggregatedAllergens.length > 0 && (
                  <div className="pt-2 border-t border-[#EFE8DC] flex items-center gap-1.5 text-[11px] text-[#865426]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Contains: {aggregatedAllergens.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Add to Bag Button */}
              <button
                type="button"
                onClick={handleAddCustomToCart}
                className={`w-full mt-4 py-3.5 px-6 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                  justAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#2A1F18] hover:bg-[#3D2E24] text-white active:scale-[0.99]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added Custom Stack to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#F7F3EB]" />
                    <span>Add Custom Stack · ${totalPrice.toFixed(2)}</span>
                  </>
                )}
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
