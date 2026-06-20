export interface Review {
  user: string;
  role: string;
  text: string;
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  priceId: string;
  image: string;
  included: string[];
  reviews: Review[];
}

export const products: Product[] = [
  {
    id: 'electronics',
    name: 'Electronic Vendor',
    description: 'High-quality supplier access for premium electronic products, gadgets, and specialized components.',
    longDescription: 'Unlock direct access to the world\'s most reliable electronics suppliers. Whether you\'re looking for the latest consumer tech, specialized components, or high-margin gadgets, our vetted list ensures you get factory-direct pricing without the middleman. Perfect for dropshippers and bulk buyers alike.',
    price: 20,
    priceId: 'price_electronics_20',
    image: 'electronics-vendor.png',
    included: [
      'Direct contact info for 50+ verified electronics suppliers',
      'Access to factory-direct bulk pricing',
      'Suppliers for smartphones, laptops, and wearables',
      'Vetted for shipping speed and product quality',
      'Step-by-step sourcing guide included'
    ],
    reviews: [
      {
        user: 'Alex D.',
        role: 'Shopify Seller',
        text: 'The electronics list is a goldmine. I found three vendors for my niche in 10 minutes that actually responded and had great prices.',
        rating: 5,
      },
      {
        user: 'James T.',
        role: 'Tech Reseller',
        text: 'Finally found a supplier for high-quality components that doesn\'t charge a fortune for shipping.',
        rating: 5,
      }
    ]
  },
  {
    id: 'clothing',
    name: 'Clothing Vendor',
    description: 'Direct access to verified clothing suppliers for latest fashion trends, streetwear, and luxury apparel.',
    longDescription: 'Step into the fashion industry with confidence. Our clothing vendor directory connects you with premium manufacturers and wholesalers specializing in everything from high-street fashion to luxury streetwear. Skip the vetting process and start building your brand with quality-tested sources.',
    price: 20,
    priceId: 'price_clothing_20',
    image: 'clothing-vendor.png',
    included: [
      'Links to 70+ top-tier clothing manufacturers',
      'Sources for streetwear, activewear, and formal attire',
      'White-label and private-label options available',
      'Verified for material quality and ethical practices',
      'Weekly updates on trending styles'
    ],
    reviews: [
      {
        user: 'Sarah M.',
        role: 'Amazon FBA',
        text: 'PK Sells saved me weeks of research. The clothing verification process they do is legit. Highly recommended.',
        rating: 5,
      },
      {
        user: 'Chloe R.',
        role: 'Boutique Owner',
        text: 'The quality of the manufacturers in this list is outstanding. My customers love the new arrivals.',
        rating: 5,
      }
    ]
  },
  {
    id: 'perfume',
    name: 'Perfume Vendor',
    description: 'Exclusive supplier links for high-end designer fragrances and rare niche perfume houses.',
    longDescription: 'The fragrance market is high-margin but hard to navigate. We provide exclusive links to authentic designer perfume wholesalers and niche fragrance houses. Get access to the most sought-after scents at prices that allow for significant retail markups.',
    price: 20,
    priceId: 'price_perfume_20',
    image: 'perfume-vendor.png',
    included: [
      'Authentic designer fragrance wholesalers',
      'Hard-to-find niche perfume suppliers',
      'Samples and bulk ordering options',
      'Authenticity verification guide',
      'Fragrance market analysis report'
    ],
    reviews: [
      {
        user: 'Elena R.',
        role: 'Dropshipper',
        text: 'The perfume list is incredible. Finding authentic wholesalers is usually a nightmare, but this made it easy.',
        rating: 5,
      },
      {
        user: 'Marcus K.',
        role: 'Fragrance Collector',
        text: 'Used this to stock my online store. The margins are great and the products are 100% genuine.',
        rating: 5,
      }
    ]
  },
  {
    id: 'moissanite',
    name: 'Moissanite Vendor',
    description: 'Direct sourcing for premium moissanite gemstones and high-end jewelry manufacturing suppliers.',
    longDescription: 'Capitalize on the booming moissanite market. Our directory provides direct sourcing for premium moissanite gemstones and high-end jewelry manufacturers. Whether you\'re selling loose stones or custom-set pieces, these vendors offer the highest clarity and brilliance at wholesale rates.',
    price: 20,
    priceId: 'price_moissanite_20',
    image: 'moissanite-vendor.png',
    included: [
      'Direct links to top moissanite labs and manufacturers',
      'Custom jewelry setting services',
      'Wholesale rates for loose stones and finished pieces',
      'Quality certification (GRA/GRI) sources',
      'Jewelry branding and packaging suppliers'
    ],
    reviews: [
      {
        user: 'Kevin L.',
        role: 'eBay PowerSeller',
        text: 'The jewelry vendors here are top-notch. My conversion rates have doubled since I switched to these sources.',
        rating: 5,
      },
      {
        user: 'Sophia G.',
        role: 'Jewelry Designer',
        text: 'Brilliant stones and reliable service. This list is a must-have for anyone in the moissanite business.',
        rating: 5,
      }
    ]
  }
];
