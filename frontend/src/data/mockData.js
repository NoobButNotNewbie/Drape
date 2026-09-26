export const curatedOutfits = [
  {
    id: 'nautical-minimalist',
    title: 'The Nautical Minimalist',
    matchBadge: '98% MATCH',
    matchPercentage: 98,
    description: 'Navy cable-knit paired with straight-leg cream linen trousers.',
    fullDescription:
      'A masterclass in textural contrast. The rich cable patterns of the navy knit ground the breezy, relaxed drape of Italian-milled cream linen trousers.',
    swatches: ['#172233', '#F4EFE6'],
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop',
    items: [
      { name: 'Cable-Knit Navy Sweater', price: '$210.00' },
      { name: 'Heritage Linen Trouser in Cream', price: '$185.00' },
      { name: 'Handcrafted Penny Loafers', price: '$260.00' },
    ],
    dnaInsights: [
      'Matches your preferred naval & chalk color palette (100%)',
      'Engineered for 18°C – 24°C coastal evenings',
      'Tailored relaxed silhouette matching your body metric profile',
    ],
  },
  {
    id: 'evening-courtyard',
    title: 'Evening Courtyard',
    matchBadge: '92% MATCH',
    matchPercentage: 92,
    description: 'Unstructured deep forest blazer over crisp linen and tailored ecru chinos.',
    fullDescription:
      'Understated evening refinement. The dark olive twill blazer complements warm sandstone architecture and relaxed golden-hour aperitifs.',
    swatches: ['#1C3F24', '#242728', '#F2ECE1'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
    items: [
      { name: 'Unstructured Forest Blazer', price: '$340.00' },
      { name: 'Heritage Linen Shirt in White', price: '$125.00' },
      { name: 'Logic Tailored Trouser in Ecru', price: '$180.00' },
    ],
    dnaInsights: [
      'High affinity for organic olive tones and Mediterranean tailoring',
      'Breathable half-canvassed construction for warm climes',
    ],
  },
  {
    id: 'texture-study-04',
    title: 'Texture Study 04',
    matchBadge: '89% MATCH',
    matchPercentage: 89,
    description: 'Subtle texture focus with handcrafted slub linen and natural horn buttons.',
    fullDescription:
      'A deep dive into garment washing and tactile yarn irregularities. Charcoal slub linen woven on vintage shuttle looms with iridescent mother-of-pearl buttons.',
    swatches: ['#323539', '#1E2021'],
    image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1200&auto=format&fit=crop',
    items: [
      { name: 'Charcoal Slub Overshirt', price: '$165.00' },
      { name: 'Vintage Horn Button Details', price: 'Included' },
    ],
    dnaInsights: [
      'Preferred textural richness over high-gloss finishes',
      'Artisanal garment wash with natural softening treatment',
    ],
  },
  {
    id: 'city-wanderer',
    title: 'The City Wanderer',
    matchBadge: '96% MATCH',
    matchPercentage: 96,
    description: 'Sky blue washed linen shirt paired with pleated British khaki chinos.',
    fullDescription:
      'Effortless movement for the modern metropolis. Light sky blue linen button-down designed for high-heat urban exploration with sharp pleated trousers.',
    swatches: ['#7492A7', '#B9A88F', '#342621'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop',
    items: [
      { name: 'Sky Washed Linen Shirt', price: '$135.00' },
      { name: 'Logic Tailored Trouser in Khaki', price: '$180.00' },
      { name: 'Belgian Suede Loafers', price: '$275.00' },
    ],
    dnaInsights: [
      'Exceptional breathability rating (98/100)',
      'Sharp architectural lines compatible with smart casual workwear',
    ],
  },
];

export const newArrivals = [
  {
    id: 'heritage-linen-shirt',
    name: 'Heritage Linen Shirt',
    price: 125.0,
    formattedPrice: '$125.00',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
    fabric: '100% French Normandy Flax Linen',
    fit: 'Relaxed Tailored Fit',
    description:
      'Woven from long-staple French flax, this shirt offers unparalleled softness and breathability. Features a relaxed spread collar, Australian mother-of-pearl buttons, and gentle garment-washing for that coveted lived-in drape from day one.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Natural Sand', hex: '#E5DFD3' },
      { name: 'Sky Blue', hex: '#97B5CA' },
    ],
    inStock: true,
  },
  {
    id: 'logic-tailored-trouser',
    name: 'Logic Tailored Trouser',
    price: 180.0,
    formattedPrice: '$180.00',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
    fabric: '65% Italian Linen, 35% Organic Cotton',
    fit: 'Mid-Rise Tapered Cut',
    description:
      'The definitive trouser for warm weather elegance. Engineered with subtle double pleats, horn button side adjusters eliminating the need for a belt, and a clean taper that lands effortlessly above your loafers.',
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Olive Moss', hex: '#3B4D3C' },
      { name: 'Tuscan Ecru', hex: '#EBE5D8' },
      { name: 'Obsidian Black', hex: '#1C1D1F' },
    ],
    inStock: true,
  },
  {
    id: 'cable-knit-navy-sweater',
    name: 'Cable-Knit Navy Sweater',
    price: 210.0,
    formattedPrice: '$210.00',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop',
    fabric: '70% Extra-fine Merino Wool, 30% Raw Linen',
    fit: 'Regular Heritage Silhouette',
    description:
      'A luxurious trans-seasonal staple. Crafted with traditional Aran-inspired cable textures, combining the plush thermal regulation of extra-fine merino with the crisp structure and dry hand of linen.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Deep Marine Navy', hex: '#141E2D' },
      { name: 'Heather Oatmeal', hex: '#DFD8CC' },
    ],
    inStock: true,
  },
  {
    id: 'logic-essential-sneaker',
    name: 'Logic Essential Sneaker',
    price: 295.0,
    formattedPrice: '$295.00',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop',
    fabric: '100% Full-Grain Italian Nappa Leather',
    fit: 'True to European size',
    description:
      'Handcrafted in Civitanova Marche, Italy. Featuring buttery calfskin lining, cushioned memory foam insoles with arch support, and durable Margom vulcanized rubber outsoles stitched to perfection.',
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Optical White', hex: '#FAFAFA' },
      { name: 'Warm Cream', hex: '#ECE7DC' },
    ],
    inStock: true,
  },
];
