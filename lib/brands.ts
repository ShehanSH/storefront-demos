import type { Brand, BrandId } from "@/lib/types";

const img = (id: string, extra = "") =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80${extra}`;

export const SALES_PHONE = process.env.NEXT_PUBLIC_SALES_PHONE || "0766650952";

export function salesWhatsAppUrl(message?: string) {
  const digits = SALES_PHONE.replace(/\D/g, "");
  const intl = digits.startsWith("94") ? digits : digits.replace(/^0/, "94");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${intl}${query}`;
}

export const BRANDS: Record<BrandId, Brand> = {
  restaurant: {
    id: "restaurant",
    kind: "food",
    name: "The Oven House",
    shortName: "Oven House",
    tagline: "Wood-fired pizza. Fresh Sri Lankan favourites.",
    description:
      "A modern restaurant demo with online ordering, pickup or delivery, a live kitchen board, and customer SMS.",
    city: "Colombo",
    address: "42 Galle Road, Colombo 03",
    phone: "0112345678",
    email: "hello@ovenhouse.demo",
    heroImage: img("photo-1513104890138-7c749659a591"),
    shopLabel: "Menu",
    productLabel: "Dishes",
    orderLabel: "Orders",
    cta: "Order online",
    special: {
      title: "Special Chicken Pizza",
      price: 1600,
      blurb: "Friday night favourite — don't cook, just order.",
    },
    smsOffer:
      "Hi! Don't cook this Friday night! Enjoy our Special Chicken Pizza for only Rs. 1,600 at The Oven House",
    categories: ["Pizza", "Kottu", "Rice", "Burgers", "Drinks"],
    products: [
      {
        slug: "chicken-pizza",
        name: "Special Chicken Pizza",
        category: "Pizza",
        price: 1600,
        compareAt: 1900,
        featured: true,
        description: "Wood-fired pizza with spicy chicken, mozzarella, and house sauce.",
        image: img("photo-1565299624946-b28f40a0ae38"),
        options: ["9 inch", "12 inch"],
      },
      {
        slug: "cheese-pizza",
        name: "Four Cheese Pizza",
        category: "Pizza",
        price: 1450,
        description: "Mozzarella, cheddar, parmesan, and cream cheese on a thin crust.",
        image: img("photo-1548365328-9f547fb0953c"),
      },
      {
        slug: "chicken-kottu",
        name: "Chicken Kottu",
        category: "Kottu",
        price: 950,
        featured: true,
        description: "Street-style kottu with chicken, egg, and godamba roti.",
        image: img("photo-1631452180519-c014fe946bc7"),
        options: ["Regular", "Cheese"],
      },
      {
        slug: "seafood-rice",
        name: "Prawn Fried Rice",
        category: "Rice",
        price: 1200,
        description: "Wok-fried rice with prawns, vegetables, and chilli paste.",
        image: img("photo-1603133872878-684f208fb84b"),
      },
      {
        slug: "beef-burger",
        name: "House Beef Burger",
        category: "Burgers",
        price: 1100,
        description: "Grilled beef patty, cheddar, pickles, and oven-house sauce.",
        image: img("photo-1550547660-d9450f859349"),
      },
      {
        slug: "iced-milo",
        name: "Iced Milo",
        category: "Drinks",
        price: 350,
        description: "Cold Milo with condensed milk. Perfect with pizza.",
        image: img("photo-1461023058943-07fcbe16d735"),
      },
    ],
    orders: [
      { id: "OVN-1042", customer: "Ayesha Fernando", phone: "0771234001", total: 1950, status: "Preparing", type: "Delivery", createdAt: "Today 12:10", items: "Chicken Pizza, Iced Milo" },
      { id: "OVN-1041", customer: "Dinesh Perera", phone: "0771234002", total: 950, status: "Ready", type: "Pickup", createdAt: "Today 11:48", items: "Chicken Kottu" },
      { id: "OVN-1040", customer: "Ishara Silva", phone: "0771234003", total: 2750, status: "Out for delivery", type: "Delivery", createdAt: "Today 11:20", items: "2× Chicken Pizza" },
      { id: "OVN-1039", customer: "Malith Jayawardena", phone: "0771234004", total: 1450, status: "Completed", type: "Pickup", createdAt: "Today 10:55", items: "Four Cheese Pizza" },
      { id: "OVN-1038", customer: "Nadeesha G.", phone: "0771234005", total: 1600, status: "New", type: "Pickup", createdAt: "Today 10:40", items: "Special Chicken Pizza" },
    ],
    customers: [
      { name: "Ayesha Fernando", phone: "0771234001", orders: 8, spent: 12400 },
      { name: "Dinesh Perera", phone: "0771234002", orders: 5, spent: 6100 },
      { name: "Ishara Silva", phone: "0771234003", orders: 11, spent: 18950 },
    ],
    stats: { orders: 18, revenue: 24680, customers: 14, pending: 3 },
  },
  clothing: {
    id: "clothing",
    kind: "retail",
    name: "Thread & Co.",
    shortName: "Thread",
    tagline: "Everyday fashion for Sri Lanka.",
    description:
      "A clothing boutique demo with a shop, size options, cart checkout, and an admin sales dashboard.",
    city: "Colombo",
    address: "18 Duplication Road, Colombo 04",
    phone: "0112456789",
    email: "hello@threadco.demo",
    heroImage: img("photo-1441986300917-64674bd600d8"),
    shopLabel: "Shop",
    productLabel: "Pieces",
    orderLabel: "Orders",
    cta: "Shop the drop",
    special: { title: "Linen Weekend Shirt", price: 3900, blurb: "Light linen. Made for Colombo heat." },
    smsOffer:
      "Hi! Weekend drop at Thread & Co. — Linen Weekend Shirt now only Rs. 3,900. Shop the look",
    categories: ["Shirts", "Dresses", "Denim", "Accessories"],
    products: [
      {
        slug: "linen-shirt",
        name: "Linen Weekend Shirt",
        category: "Shirts",
        price: 3900,
        compareAt: 4900,
        featured: true,
        description: "Breathable linen shirt in sand. Pair with denim or trousers.",
        image: img("photo-1596755094514-f87e34085b2c"),
        options: ["S", "M", "L", "XL"],
      },
      {
        slug: "silk-dress",
        name: "Evening Silk Dress",
        category: "Dresses",
        price: 8900,
        featured: true,
        description: "Bias-cut silk dress for dinners and events.",
        image: img("photo-1595777457583-95e059d581b8"),
        options: ["S", "M", "L"],
      },
      {
        slug: "selvedge-jeans",
        name: "Selvedge Denim",
        category: "Denim",
        price: 7200,
        description: "Straight-fit selvedge jeans with a clean wash.",
        image: img("photo-1542272454315-4c01d7abdf4a"),
        options: ["30", "32", "34", "36"],
      },
      {
        slug: "cotton-tee",
        name: "Heavy Cotton Tee",
        category: "Shirts",
        price: 2200,
        description: "Thick cotton tee. Soft after the first wash.",
        image: img("photo-1521572163474-6864f9cf17ab"),
        options: ["S", "M", "L", "XL"],
      },
      {
        slug: "canvas-tote",
        name: "Canvas Tote",
        category: "Accessories",
        price: 1800,
        description: "Everyday tote with an inside pocket.",
        image: img("photo-1544816155-12df9643fe78"),
      },
      {
        slug: "wool-scarf",
        name: "Merino Scarf",
        category: "Accessories",
        price: 2500,
        description: "Soft merino scarf in charcoal.",
        image: img("photo-1520903920243-00d872a2d1c1"),
      },
    ],
    orders: [
      { id: "THD-2208", customer: "Kavindi Mendis", phone: "0772234001", total: 3900, status: "Packed", type: "Pickup", createdAt: "Today 13:05", items: "Linen Weekend Shirt · M" },
      { id: "THD-2207", customer: "Sajith Weerasinghe", phone: "0772234002", total: 9400, status: "New", type: "Delivery", createdAt: "Today 12:22", items: "Selvedge Denim, Cotton Tee" },
      { id: "THD-2206", customer: "Piumi Herath", phone: "0772234003", total: 8900, status: "Completed", type: "Delivery", createdAt: "Today 10:18", items: "Evening Silk Dress · S" },
    ],
    customers: [
      { name: "Kavindi Mendis", phone: "0772234001", orders: 4, spent: 15600 },
      { name: "Piumi Herath", phone: "0772234003", orders: 6, spent: 24800 },
    ],
    stats: { orders: 12, revenue: 41850, customers: 9, pending: 2 },
  },
  tech: {
    id: "tech",
    kind: "retail",
    name: "Pixel Mart",
    shortName: "Pixel",
    tagline: "Phones, laptops, and gear you can trust.",
    description:
      "A consumer-electronics store demo for mobile and laptop sellers, with product pages, checkout, and stock-style admin.",
    city: "Nugegoda",
    address: "210 High Level Road, Nugegoda",
    phone: "0112789000",
    email: "sales@pixelmart.demo",
    heroImage: img("photo-1511707171634-5f897ff02aa9"),
    shopLabel: "Store",
    productLabel: "Devices",
    orderLabel: "Orders",
    cta: "Browse devices",
    special: { title: "Pixel 9a 128GB", price: 89900, blurb: "This week's phone deal. Island-wide delivery." },
    smsOffer:
      "Hi! This week at Pixel Mart — Pixel 9a 128GB for Rs. 89,900. See the store",
    categories: ["Phones", "Laptops", "Audio", "Accessories"],
    products: [
      {
        slug: "pixel-9a",
        name: "Pixel 9a 128GB",
        category: "Phones",
        price: 89900,
        compareAt: 99900,
        featured: true,
        description: "Clean Android, strong camera, all-day battery. Demo listing with cash-on-delivery.",
        image: img("photo-1598327105666-5b89351aff97"),
        options: ["Obsidian", "Porcelain"],
      },
      {
        slug: "galaxy-a56",
        name: "Galaxy A56 256GB",
        category: "Phones",
        price: 124900,
        description: "AMOLED display and a long-lasting battery for daily use.",
        image: img("photo-1511707171634-5f897ff02aa9"),
      },
      {
        slug: "ideapad-slim",
        name: "IdeaPad Slim 15",
        category: "Laptops",
        price: 189000,
        featured: true,
        description: "15-inch student and office laptop. 16GB RAM, 512GB SSD.",
        image: img("photo-1517336714731-489689fd1ca8"),
        options: ["i5 / 16GB", "i7 / 16GB"],
      },
      {
        slug: "macbook-air",
        name: "MacBook Air 13",
        category: "Laptops",
        price: 329000,
        description: "Light metal laptop for design and study work.",
        image: img("photo-1517336714731-489689fd1ca8"),
      },
      {
        slug: "studio-buds",
        name: "Studio Buds",
        category: "Audio",
        price: 18900,
        description: "Wireless earbuds with a charging case.",
        image: img("photo-1590658268037-6bf12165a8df"),
      },
      {
        slug: "65w-gan",
        name: "65W GaN Charger",
        category: "Accessories",
        price: 6500,
        description: "Fast charger for phones and compact laptops.",
        image: img("photo-1583863780434-b1c1bca740c0"),
      },
    ],
    orders: [
      { id: "PXL-5510", customer: "Nuwan Amarasinghe", phone: "0773234001", total: 89900, status: "Confirmed", type: "Pickup", createdAt: "Today 14:02", items: "Pixel 9a 128GB · Obsidian" },
      { id: "PXL-5509", customer: "Harini Pathirana", phone: "0773234002", total: 195500, status: "Packed", type: "Delivery", createdAt: "Today 11:40", items: "IdeaPad Slim 15, 65W charger" },
      { id: "PXL-5508", customer: "Lakshan Cooray", phone: "0773234003", total: 18900, status: "Completed", type: "Pickup", createdAt: "Yesterday 16:20", items: "Studio Buds" },
    ],
    customers: [
      { name: "Nuwan Amarasinghe", phone: "0773234001", orders: 2, spent: 96400 },
      { name: "Harini Pathirana", phone: "0773234002", orders: 3, spent: 214200 },
    ],
    stats: { orders: 9, revenue: 612400, customers: 7, pending: 2 },
  },
  salon: {
    id: "salon",
    kind: "booking",
    name: "Bloom Studio",
    shortName: "Bloom",
    tagline: "Hair, skin, and quiet luxury.",
    description:
      "A salon appointment demo with service menus, time-slot booking, and a staff calendar-style admin.",
    city: "Bambalapitiya",
    address: "88 Galle Road, Bambalapitiya",
    phone: "0112550011",
    email: "book@bloomstudio.demo",
    heroImage: img("photo-1560066984-138dadb4c035"),
    shopLabel: "Services",
    productLabel: "Treatments",
    orderLabel: "Appointments",
    cta: "Book a chair",
    special: { title: "Friday Blowout", price: 3500, blurb: "Skip the queue. Book your Friday slot online." },
    smsOffer:
      "Hi! Treat yourself this Friday at Bloom Studio — blowout from Rs. 3,500. Book a chair",
    categories: ["Hair", "Colour", "Skin", "Nails"],
    products: [
      {
        slug: "signature-cut",
        name: "Signature Cut & Style",
        category: "Hair",
        price: 4500,
        featured: true,
        description: "Consultation, cut, and finish. 60 minutes.",
        image: img("photo-1562322140-8baeececf3df"),
      },
      {
        slug: "friday-blowout",
        name: "Friday Blowout",
        category: "Hair",
        price: 3500,
        featured: true,
        description: "Wash, blow-dry, and style. The Friday favourite.",
        image: img("photo-1522337360788-8b13dee7a37e"),
      },
      {
        slug: "balayage",
        name: "Balayage Colour",
        category: "Colour",
        price: 18500,
        description: "Hand-painted colour with toner and treatment. 3 hours.",
        image: img("photo-1522337660859-02fbefca4702"),
      },
      {
        slug: "glow-facial",
        name: "Glow Facial",
        category: "Skin",
        price: 6200,
        description: "Cleanse, extract, mask, and glow finish. 75 minutes.",
        image: img("photo-1570172619604-71b3917bb180"),
      },
      {
        slug: "gel-manicure",
        name: "Gel Manicure",
        category: "Nails",
        price: 2800,
        description: "Shape, care, and long-wear gel colour.",
        image: img("photo-1604654894610-df63bc536371"),
      },
      {
        slug: "brow-shape",
        name: "Brow Shape",
        category: "Skin",
        price: 1500,
        description: "Clean brow map and wax. 20 minutes.",
        image: img("photo-1516975080664-ed2fc6a32937"),
      },
    ],
    orders: [
      { id: "BLM-3304", customer: "Shanika Rajapaksha", phone: "0774234001", total: 3500, status: "Confirmed", type: "Fri 4:30 PM", createdAt: "Today 09:12", items: "Friday Blowout · Maya" },
      { id: "BLM-3303", customer: "Fathima Rizan", phone: "0774234002", total: 18500, status: "In chair", type: "Today 1:00 PM", createdAt: "Yesterday 18:40", items: "Balayage Colour · Nisha" },
      { id: "BLM-3302", customer: "Dilani Samarakoon", phone: "0774234003", total: 6200, status: "Completed", type: "Today 10:00 AM", createdAt: "Yesterday 14:05", items: "Glow Facial · Amaya" },
    ],
    customers: [
      { name: "Shanika Rajapaksha", phone: "0774234001", orders: 7, spent: 24600 },
      { name: "Fathima Rizan", phone: "0774234002", orders: 3, spent: 31200 },
    ],
    stats: { orders: 11, revenue: 38400, customers: 10, pending: 2 },
  },
};

export const BRAND_LIST = Object.values(BRANDS);

export function isBrandId(value: string): value is BrandId {
  return value in BRANDS;
}

export function getBrand(id: string): Brand {
  if (!isBrandId(id)) {
    throw new Error(`Unknown demo brand: ${id}`);
  }
  return BRANDS[id];
}

export function findProduct(brand: Brand, slug: string) {
  return brand.products.find((product) => product.slug === slug) ?? null;
}

export function salesFollowUpSms() {
  return `If you want to increase your sales and take orders by sending messages to customers, please contact us - ${SALES_PHONE}`;
}

export function offerSms(brand: Brand, siteUrl: string) {
  const link = `${siteUrl.replace(/\/$/, "")}/${brand.id}`;
  return `${brand.smsOffer} ${link}`;
}
