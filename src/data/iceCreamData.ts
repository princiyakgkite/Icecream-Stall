export interface Flavor {
  id: string;
  name: string;
  tagline: string;
  category: 'signature' | 'seasonal' | 'vegan' | 'sundae';
  description: string;
  ingredients: string[];
  dairySource: string;
  dietary: string[]; // e.g. ['Gluten-Free', 'Organic Dairy']
  allergens: string[];
  color: string;
  textColor: string;
  pricePerSingle: number;
  image: string;
  status: 'In Scoop Cabinet' | 'Fresh Batch Churning' | 'Last 2 Pints';
  tastingNotes: string[];
  fatContent: string;
}

export interface Vessel {
  id: string;
  name: string;
  description: string;
  price: number;
  dietary: string;
  iconType: 'waffle' | 'sesame' | 'brioche' | 'cup';
}

export interface Topping {
  id: string;
  name: string;
  category: 'drizzle' | 'crunch' | 'cloud';
  price: number;
  description: string;
}

export interface StallSchedule {
  day: string;
  dateStr: string;
  locationName: string;
  address: string;
  hours: string;
  status: 'Open Now' | 'Opening Soon' | 'Scheduled';
  weatherHighlight: string;
  isToday: boolean;
}

export interface CartItem {
  id: string;
  type: 'standard' | 'custom_builder' | 'sundae' | 'pint';
  title: string;
  subtitle: string;
  vessel?: string;
  scoops?: { name: string; color: string }[];
  toppings?: string[];
  size?: 'Single' | 'Double' | 'Triple' | 'Pint';
  unitPrice: number;
  quantity: number;
  notes?: string;
  image?: string;
}

export const STALL_LOCATIONS: StallSchedule[] = [
  {
    day: 'Today · Friday',
    dateStr: 'Oct 4',
    locationName: 'Harbor Promenade & Pier 4',
    address: '42 Waterfront Esplanade, Dockside Gate B',
    hours: '11:30 AM – 10:00 PM',
    status: 'Open Now',
    weatherHighlight: '72°F · Crisp Sea Breeze · Ideal Waffle Weather',
    isToday: true,
  },
  {
    day: 'Saturday',
    dateStr: 'Oct 5',
    locationName: 'Old Town Heritage Market Plaza',
    address: '118 Cobblestone Row, Near the Fountain',
    hours: '10:00 AM – 9:30 PM',
    status: 'Opening Soon',
    weatherHighlight: '76°F · Warm Afternoon Sun',
    isToday: false,
  },
  {
    day: 'Sunday',
    dateStr: 'Oct 6',
    locationName: 'Sunset Grove Botanical Green',
    address: 'Central Lawn Pavilion, Grove Gate',
    hours: '11:00 AM – 8:00 PM',
    status: 'Scheduled',
    weatherHighlight: '70°F · Golden Hour Jazz in the Park',
    isToday: false,
  },
];

export const FLAVORS: Flavor[] = [
  {
    id: 'sicilian-pistachio',
    name: 'Bronte Sicilian Pistachio',
    tagline: 'Slow-roasted Bronte emerald pistachios with flaky Maldon salt',
    category: 'signature',
    description: 'Directly sourced DOP pistachios from volcanic soil in Mount Etna, pureed into our high-butterfat Jersey cream base with zero artificial extracts.',
    ingredients: ['Pasture Jersey Milk', 'Organic Cream', 'Bronte Sicilian Pistachios', 'Cane Sugar', 'Maldon Flaky Salt'],
    dairySource: 'Meadowood Organic Valley, Batch #409',
    dietary: ['Gluten-Free', 'Egg-Free'],
    allergens: ['Tree Nuts (Pistachio)', 'Milk'],
    color: '#899E71',
    textColor: '#ffffff',
    pricePerSingle: 5.75,
    image: '/src/assets/images/scoop_pistachio_cone_1791181432859.jpg',
    status: 'In Scoop Cabinet',
    tastingNotes: ['Toasted nut butter', 'Buttery velvet finish', 'Delicate saline lift'],
    fatContent: '15.2% Butterfat',
  },
  {
    id: 'strawberry-balsamic',
    name: 'Roasted Strawberry & Aged Balsamic',
    tagline: 'Carmel Valley strawberries macerated in 12-year Modena reduction',
    category: 'seasonal',
    description: 'Ripe organic Albion strawberries slow-roasted with honey and folded into fresh sweet cream with ribbons of sweet, tart aged balsamic glaze.',
    ingredients: ['Organic Strawberries', 'Jersey Milk', 'Cane Sugar', 'Modena IGP Balsamic Vinegar', 'Lemon Zest'],
    dairySource: 'Sweet Springs Creamery, Local Fresh Delivery',
    dietary: ['Gluten-Free', 'Egg-Free', 'Vegetarian'],
    allergens: ['Milk'],
    color: '#D46379',
    textColor: '#ffffff',
    pricePerSingle: 5.75,
    image: '/src/assets/images/scoop_strawberry_sundae_1791181449179.jpg',
    status: 'In Scoop Cabinet',
    tastingNotes: ['Bright jammy berries', 'Subtle woody acid', 'Silky floral aroma'],
    fatContent: '14.0% Butterfat',
  },
  {
    id: 'valrhona-fudge-brownie',
    name: '72% Valrhona Dark Cocoa & Brownie',
    tagline: 'Guanaja single-origin dark chocolate with house-baked fudge chunks',
    category: 'signature',
    description: 'An unapologetically deep, bittersweet cocoa experience churned with slow-folded fudge brownie cubes and Maldon salt flakes.',
    ingredients: ['Valrhona 72% Dark Chocolate', 'Dutch Process Cocoa', 'Jersey Cream', 'Unbleached Butter', 'Brownie Chunks'],
    dairySource: 'Meadowood Organic Valley',
    dietary: ['Vegetarian'],
    allergens: ['Milk', 'Wheat/Gluten', 'Eggs'],
    color: '#3B231B',
    textColor: '#ffffff',
    pricePerSingle: 6.00,
    image: '/src/assets/images/scoop_chocolate_fudge_1791181464146.jpg',
    status: 'In Scoop Cabinet',
    tastingNotes: ['Bittersweet ganache', 'Chewy cocoa crumb', 'Molasses undertones'],
    fatContent: '16.1% Butterfat',
  },
  {
    id: 'tahitian-vanilla-honeycomb',
    name: 'Tahitian Vanilla & Golden Honeycomb',
    tagline: 'Fragrant cured vanilla bean speckled with crunchy wildflower honeycomb',
    category: 'signature',
    description: 'Whole Tahitian vanilla pods steep in cold cream for 36 hours, punctuated by airy, crackly bites of honeycomb toffee crafted from local wildflower honey.',
    ingredients: ['Fresh Jersey Cream', 'Tahitian Vanilla Caviar', 'Local Wildflower Honey', 'Golden Cane Sugar'],
    dairySource: 'Meadowood Organic Valley',
    dietary: ['Gluten-Free', 'Vegetarian'],
    allergens: ['Milk'],
    color: '#E8D4A2',
    textColor: '#2C241E',
    pricePerSingle: 5.50,
    image: '/src/assets/images/hero_icecream_stall_1791181409583.jpg',
    status: 'Fresh Batch Churning',
    tastingNotes: ['Floral vanilla bean', 'Burnt sugar crunch', 'Rich sweet cream'],
    fatContent: '15.5% Butterfat',
  },
  {
    id: 'salted-butter-caramel',
    name: 'Brittany Salted Butter Caramel',
    tagline: 'Deep amber caramel cooked in copper pots with cultured French butter',
    category: 'signature',
    description: 'Traditional caramel kettle recipe with Fleur de Sel de Guérande folded into an ultra-velvety cream base.',
    ingredients: ['Jersey Milk', 'Cultured Butter', 'Caramelized Sugar', 'Fleur de Sel', 'Tahitian Vanilla'],
    dairySource: 'Meadowood Organic Valley',
    dietary: ['Gluten-Free', 'Vegetarian'],
    allergens: ['Milk'],
    color: '#BA7A3A',
    textColor: '#ffffff',
    pricePerSingle: 5.75,
    image: '/src/assets/images/scoop_pistachio_cone_1791181432859.jpg',
    status: 'In Scoop Cabinet',
    tastingNotes: ['Toasted toffee', 'Cultured cream', 'Subtle smoky salt'],
    fatContent: '15.8% Butterfat',
  },
  {
    id: 'meyer-lemon-ricotta',
    name: 'Meyer Lemon Curd & Whipped Ricotta',
    tagline: 'Tart California Meyer lemon curd swirled through fresh sheep ricotta',
    category: 'seasonal',
    description: 'Bright citrus warmth meets pillow-soft fresh Bellwether Farms ricotta with candied lemon peel ribbons.',
    ingredients: ['Sheep Milk Ricotta', 'Meyer Lemon Zest & Juice', 'Organic Cream', 'Cane Sugar', 'Egg Yolks'],
    dairySource: 'Bellwether Farm Artisanal Dairy',
    dietary: ['Gluten-Free', 'Vegetarian'],
    allergens: ['Milk', 'Eggs'],
    color: '#F4DC8C',
    textColor: '#2C241E',
    pricePerSingle: 6.00,
    image: '/src/assets/images/scoop_strawberry_sundae_1791181449179.jpg',
    status: 'In Scoop Cabinet',
    tastingNotes: ['Zesty citrus curd', 'Velvety curd swirl', 'Delicate ricotta crumb'],
    fatContent: '13.8% Butterfat',
  },
  {
    id: 'alphonso-mango-passionfruit',
    name: 'Alphonso Mango & Passionfruit Sorbet',
    tagline: 'Velvety water-based sorbet from Indian Alphonso mangoes and passion pulp',
    category: 'vegan',
    description: '100% plant-based and churned without dairy. Intensely fruit-forward, naturally creamy and tangy.',
    ingredients: ['Ratnagiri Alphonso Mango Puree', 'Fresh Passionfruit Juice', 'Filtered Water', 'Organic Turbinado'],
    dairySource: '100% Dairy-Free / Plant Puree',
    dietary: ['Dairy-Free', 'Vegan', 'Gluten-Free'],
    allergens: [],
    color: '#FFA834',
    textColor: '#2C241E',
    pricePerSingle: 5.50,
    image: '/src/assets/images/hero_icecream_stall_1791181409583.jpg',
    status: 'In Scoop Cabinet',
    tastingNotes: ['Luscious tropical nectar', 'Bright tart seeds', 'Clean refreshing finish'],
    fatContent: '0% Fat',
  },
  {
    id: 'espresso-stracciatella',
    name: 'Cold Brew Espresso Stracciatella',
    tagline: 'Single-origin Ethiopian cold brew with crackled ribbons of dark chocolate',
    category: 'signature',
    description: '18-hour cold brew infused into sweet custard cream, finished with hand-drizzled molten 65% chocolate that shatters into micro-crisps upon contact.',
    ingredients: ['Ethiopian Yirgacheffe Cold Brew', 'Jersey Cream', 'Organic Egg Yolks', '65% Dark Chocolate Shards'],
    dairySource: 'Meadowood Organic Valley',
    dietary: ['Gluten-Free', 'Vegetarian'],
    allergens: ['Milk', 'Eggs'],
    color: '#7C5844',
    textColor: '#ffffff',
    pricePerSingle: 5.75,
    image: '/src/assets/images/scoop_chocolate_fudge_1791181464146.jpg',
    status: 'Last 2 Pints',
    tastingNotes: ['Berry chocolate notes', 'Smooth roast coffee', 'Crisp chocolate crackle'],
    fatContent: '14.9% Butterfat',
  }
];

export const VESSELS: Vessel[] = [
  {
    id: 'house-waffle',
    name: 'House Brown Butter Waffle Cone',
    description: 'Rolled warm right on the stall griddle every 20 minutes with sweet cream butter and vanilla.',
    price: 1.50,
    dietary: 'Contains Gluten & Dairy',
    iconType: 'waffle',
  },
  {
    id: 'black-sesame-cone',
    name: 'Toasted Black Sesame Waffle',
    description: 'Infused with roasted Japanese black sesame seeds for a nutty, aromatic savory crunch.',
    price: 1.75,
    dietary: 'Contains Sesame & Gluten',
    iconType: 'sesame',
  },
  {
    id: 'brioche-slider',
    name: 'Warm Toasted Brioche Bun',
    description: 'Sicilian-style Gelato con Brioche. Warm golden egg brioche split and stuffed with cold scoops.',
    price: 2.25,
    dietary: 'Contains Gluten, Dairy & Eggs',
    iconType: 'brioche',
  },
  {
    id: 'compostable-cup',
    name: 'Artisan Bamboo Paper Cup & Wooden Spoon',
    description: '100% commercially compostable cup, ideal for savoring toppings and slow walks.',
    price: 0.00,
    dietary: 'Gluten-Free Friendly',
    iconType: 'cup',
  }
];

export const TOPPINGS: Topping[] = [
  {
    id: 'valrhona-hot-fudge',
    name: 'Warm Valrhona Hot Fudge',
    category: 'drizzle',
    price: 1.25,
    description: 'Served warm from our stall bain-marie.',
  },
  {
    id: 'salted-butterscotch',
    name: 'Salted Butterscotch Drizzle',
    category: 'drizzle',
    price: 1.25,
    description: 'Cooked with brown sugar and heavy cream.',
  },
  {
    id: 'honeycomb-brittle',
    name: 'Wildflower Honeycomb Crunch',
    category: 'crunch',
    price: 1.00,
    description: 'Hand-crushed airy toffee shards.',
  },
  {
    id: 'roasted-pistachio-crumb',
    name: 'Toasted Bronte Pistachio Crumb',
    category: 'crunch',
    price: 1.25,
    description: 'Coarsely chopped Sicilian nuts with sea salt.',
  },
  {
    id: 'freeze-dried-raspberries',
    name: 'Freeze-Dried Tart Raspberries',
    category: 'crunch',
    price: 1.00,
    description: 'Vibrant crimson dust with crisp berry burst.',
  },
  {
    id: 'mascarpone-whip',
    name: 'Hand-Whipped Mascarpone Cream',
    category: 'cloud',
    price: 1.00,
    description: 'Whipped fresh with a pinch of powdered sugar.',
  }
];

export const SIGNATURE_SUNDAES = [
  {
    id: 'sundae-et-noir',
    name: 'The Midnight Harbour Sundae',
    tagline: '72% Valrhona Fudge & Espresso Stracciatella, warm fudge sauce, roasted hazelnuts, and vanilla whipped cloud in a vintage glass coupe.',
    price: 9.75,
    image: '/src/assets/images/scoop_chocolate_fudge_1791181464146.jpg',
    scoops: ['72% Valrhona Dark Cocoa', 'Cold Brew Espresso Stracciatella'],
    toppings: ['Warm Valrhona Hot Fudge', 'Toasted Bronte Pistachio Crumb', 'Hand-Whipped Mascarpone Cream'],
  },
  {
    id: 'sundae-summer-verona',
    name: 'Villa Verona Strawberry Coupe',
    tagline: 'Double scoop of Roasted Strawberry Balsamic and Tahitian Vanilla, fresh berry compote, freeze-dried raspberry dust and house waffle crisp.',
    price: 9.50,
    image: '/src/assets/images/scoop_strawberry_sundae_1791181449179.jpg',
    scoops: ['Roasted Strawberry & Aged Balsamic', 'Tahitian Vanilla & Honeycomb'],
    toppings: ['Freeze-Dried Raspberries', 'Wildflower Honeycomb Crunch', 'House Waffle Crisp'],
  },
  {
    id: 'tasting-flight',
    name: 'The Four-Scoop Stall Flight',
    tagline: 'Can’t choose? A flight of 4 mini scoops served on an artisan wooden paddle with wafer crisps and tasting note guide.',
    price: 11.50,
    image: '/src/assets/images/scoop_pistachio_cone_1791181432859.jpg',
    scoops: ['Bronte Sicilian Pistachio', 'Roasted Strawberry', 'Salted Butter Caramel', 'Cold Brew Espresso'],
    toppings: ['Waffle Cone Chips', 'Fleur de Sel Pinches'],
  }
];

export const REVIEWS = [
  {
    quote: "The pistachio ice cream alone is worth queueing down the cobblestones for. You can taste the real stone-ground Sicilian nuts in every spoon.",
    author: "Elena Vasquez",
    role: "Culinary Writer, The Coastal Digest",
    favorite: "Bronte Pistachio in House Waffle Cone"
  },
  {
    quote: "The brioche gelato slider stopped me in my tracks. Warm, buttery bun with cold slow-churned caramel gelato. Absolute perfection at the harbor.",
    author: "Marcus Chen",
    role: "Regular Stall Patron & Food Photographer",
    favorite: "Brittany Salted Caramel Brioche"
  },
  {
    quote: "We hired their mobile cart for our garden wedding cocktail hour. Guests are still talking about the freshly pressed waffle cones and strawberry balsamic.",
    author: "Sophie & Liam Taylor",
    role: "Private Event Host",
    favorite: "Catering Cart 5-Flavor Service"
  }
];
