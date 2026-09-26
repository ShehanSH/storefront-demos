export type BrandId = "restaurant" | "clothing" | "tech" | "salon";
export type BrandKind = "food" | "retail" | "booking";

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  description: string;
  image: string;
  featured?: boolean;
  options?: string[];
};

export type DemoOrder = {
  id: string;
  customer: string;
  phone: string;
  total: number;
  status: string;
  type: string;
  createdAt: string;
  items: string;
};

export type DemoCustomer = {
  name: string;
  phone: string;
  orders: number;
  spent: number;
};

export type Brand = {
  id: BrandId;
  kind: BrandKind;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  heroImage: string;
  shopLabel: string;
  productLabel: string;
  orderLabel: string;
  cta: string;
  special: { title: string; price: number; blurb: string };
  smsOffer: string;
  categories: string[];
  products: Product[];
  orders: DemoOrder[];
  customers: DemoCustomer[];
  stats: { orders: number; revenue: number; customers: number; pending: number };
};
