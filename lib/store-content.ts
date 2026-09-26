import type { Brand, BrandId, Product } from "@/lib/types";

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

const EXTRA: Record<BrandId, Product[]> = {
  restaurant: [
    { slug: "veggie-pizza", name: "Garden Veggie Pizza", category: "Pizza", price: 1350, description: "Peppers, olives, corn, and mozzarella.", image: img("photo-1574071318508-1cdbab80d002") },
    { slug: "cheese-kottu", name: "Cheese Kottu", category: "Kottu", price: 1100, featured: true, description: "Chicken kottu finished with melted cheese.", image: img("photo-1585937421612-70a008356fbe") },
    { slug: "chicken-rice", name: "Devilled Chicken Rice", category: "Rice", price: 1050, description: "Spicy chicken with vegetable fried rice.", image: img("photo-1512058564366-18510be2db19") },
    { slug: "chicken-burger", name: "Crispy Chicken Burger", category: "Burgers", price: 980, description: "Crispy fillet, slaw, and house chilli mayo.", image: img("photo-1568901346375-23c9450c58cd") },
    { slug: "lime-soda", name: "Fresh Lime Soda", category: "Drinks", price: 280, description: "Sweet or salt. Ice-cold.", image: img("photo-1513558161293-cdaf765ed2fd") },
    { slug: "mango-lassi", name: "Mango Lassi", category: "Drinks", price: 420, description: "Thick mango yoghurt drink.", image: img("photo-1570197788417-0e82375c9371") },
  ],
  clothing: [
    { slug: "navy-chino", name: "Navy Chino", category: "Denim", price: 4800, description: "Slim chino for work and weekends.", image: img("photo-1473966968600-fa801b869a1a"), options: ["30", "32", "34"] },
    { slug: "city-hoodie", name: "City Hoodie", category: "Shirts", price: 4200, featured: true, description: "Heavy fleece hoodie in stone.", image: img("photo-1556821840-3a63f95609a7"), options: ["S", "M", "L", "XL"] },
    { slug: "court-sneaker", name: "Court Sneaker", category: "Accessories", price: 8900, description: "White leather court shoe.", image: img("photo-1542291026-7eec264c27ff"), options: ["40", "41", "42", "43"] },
    { slug: "leather-belt", name: "Leather Belt", category: "Accessories", price: 2400, description: "Tan leather with a brass buckle.", image: img("photo-1624222247344-550fb60583fd") },
  ],
  tech: [
    { slug: "redmi-note", name: "Redmi Note 14", category: "Phones", price: 64900, description: "Everyday Android with a strong battery.", image: img("photo-1511707171634-5f897ff02aa9") },
    { slug: "ipad-10", name: "iPad 10.9", category: "Laptops", price: 189000, featured: true, description: "Study and drawing tablet with a large screen.", image: img("photo-1544244015-0df4b3ffc6b0") },
    { slug: "powerbank-20", name: "20,000mAh Power Bank", category: "Accessories", price: 8900, description: "Two-port fast charge pack.", image: img("photo-1609091839311-d5365f9ff1c5") },
    { slug: "fit-watch", name: "Fit Watch SE", category: "Accessories", price: 12900, description: "Heart rate, steps, and message alerts.", image: img("photo-1523275335684-37898b6baf30") },
  ],
  salon: [
    { slug: "keratin-smooth", name: "Keratin Smooth", category: "Hair", price: 14500, description: "Smoothing treatment. About 2 hours.", image: img("photo-1560869713-7d0b294308ba") },
    { slug: "hair-spa", name: "Hair Spa", category: "Hair", price: 4800, featured: true, description: "Oil, steam, and deep condition.", image: img("photo-1527799820031-afd95cb05716") },
    { slug: "gel-pedicure", name: "Gel Pedicure", category: "Nails", price: 3200, description: "Foot care and long-wear colour.", image: img("photo-1519014816548-bf5fe059798b") },
    { slug: "bridal-trial", name: "Bridal Trial", category: "Colour", price: 12500, description: "Hair and makeup trial for the wedding week.", image: img("photo-1519741497674-611481863552") },
  ],
};

export function findCatalogProduct(brand: Brand, slug: string) {
  return catalog(brand).find((product) => product.slug === slug) ?? null;
}

export function catalog(brand: Brand): Product[] {
  const extra = EXTRA[brand.id] ?? [];
  const seen = new Set(brand.products.map((product) => product.slug));
  return [...brand.products, ...extra.filter((product) => !seen.has(product.slug))];
}

export function highlights(brand: Brand) {
  if (brand.kind === "food") {
    return [
      { title: "Order in 2 minutes", text: "Pickup or delivery. Cash when it arrives." },
      { title: "Kitchen updates", text: "Staff move orders from new to ready on a live board." },
      { title: "SMS on your phone", text: "Placed, ready, and out-for-delivery texts." },
    ];
  }
  if (brand.kind === "booking") {
    return [
      { title: "Book a chair online", text: "Pick a service, stylist, and time." },
      { title: "No waiting list calls", text: "Friday slots fill on the site first." },
      { title: "SMS reminders", text: "Customers get a message before they come in." },
    ];
  }
  return [
    { title: "Shop on your phone", text: "Sizes, colours, and cash on delivery." },
    { title: "Staff pack from a board", text: "New, packed, ready, out for delivery." },
    { title: "Offer SMS", text: "Weekend drops go to saved customer numbers." },
  ];
}

export function hours() {
  return [
    ["Monday – Thursday", "10:00 – 21:00"],
    ["Friday – Saturday", "10:00 – 22:30"],
    ["Sunday", "11:00 – 20:00"],
  ];
}

export function reviews(brand: Brand) {
  return [
    { name: "Ayesha F.", text: `${brand.shortName} is easy on the phone. I ordered without calling the shop.` },
    { name: "Dinesh P.", text: "The SMS when it was ready saved a trip. This is how a modern shop should work." },
    { name: "Kavindi M.", text: "Clean site, clear prices, and the admin looks ready for a real team." },
  ];
}

export function aboutStory(brand: Brand) {
  if (brand.kind === "food") {
    return `${brand.name} is a Colombo kitchen demo: pizza, kottu, rice, and burgers for pickup or delivery. Guests browse the menu, add spice or size, and pay cash on collect.`;
  }
  if (brand.kind === "booking") {
    return `${brand.name} is a salon demo. Guests pick a treatment, a stylist, and a time — no phone tag for Friday chairs.`;
  }
  if (brand.id === "clothing") {
    return `${brand.name} is a boutique demo. Shirts, denim, and extras with sizes, a cart, and cash on delivery.`;
  }
  return `${brand.name} is a phone and laptop shop demo. Clear prices, pickup or delivery, and a staff board for packing.`;
}

export function socials(brand: Brand) {
  const slug = brand.id;
  return {
    facebook: `https://facebook.com/${slug}demo`,
    instagram: `https://instagram.com/${slug}demo`,
    tiktok: `https://tiktok.com/@${slug}demo`,
    whatsapp: `https://wa.me/94${brand.phone.replace(/\D/g, "").replace(/^0/, "")}`,
  };
}

