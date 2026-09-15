export type Product = {
  id: string;
  name: string;
  origin: string;
  notes: string;
  price: number;
  image: string;
  tag?: string;
  stock: number;
};

export const products: Product[] = [
  {
    id: 'etiopia-guji',
    name: 'Etiopía Guji',
    origin: 'Lavado · 340 g',
    notes: 'Jazmín, durazno, té negro',
    price: 18.5,
    image: '/products/etiopia.png',
    tag: 'Nuevo',
    stock: 12,
  },
  {
    id: 'colombia-huila',
    name: 'Colombia Huila',
    origin: 'Honey · 340 g',
    notes: 'Panela, cacao, mandarina',
    price: 15.9,
    image: '/products/colombia.png',
    stock: 20,
  },
  {
    id: 'prensa-francesa',
    name: 'Prensa francesa',
    origin: 'Vidrio y acero · 600 ml',
    notes: 'Cuerpo intenso, sin filtro de papel',
    price: 34.0,
    image: '/products/prensa.png',
    stock: 8,
  },
  {
    id: 'molino-manual',
    name: 'Molino manual',
    origin: 'Fresas cónicas de acero',
    notes: '38 clics de ajuste de molienda',
    price: 62.0,
    image: '/products/molino.png',
    tag: 'Más vendido',
    stock: 5,
  },
  {
    id: 'taza-ceramica',
    name: 'Taza de cerámica',
    origin: 'Hecha a mano · 250 ml',
    notes: 'Esmalte verde salvia, borde crudo',
    price: 12.0,
    image: '/products/taza.png',
    stock: 30,
  },
  {
    id: 'dripper-v60',
    name: 'Dripper con jarra',
    origin: 'Cerámica y vidrio · 1–2 tazas',
    notes: 'Taza limpia y aromática',
    price: 28.5,
    image: '/products/v60.png',
    stock: 10,
  },
];

export type CartLine = {
  product: Product;
  quantity: number;
};

// Líneas fijas para que el resumen no se vea vacío mientras maquetas.
// Reemplázalas por el estado real de tu carrito.
export const demoCartLines: CartLine[] = [
  { product: products[0], quantity: 2 },
  { product: products[4], quantity: 1 },
];

export type Coupon = {
  code: string;
  label: string;
  type: 'percent' | 'fixed' | 'shipping';
  value: number;
  minSubtotal?: number;
};

export const coupons: Coupon[] = [
  {
    code: 'CAFE10',
    label: '10% de descuento en todo el pedido',
    type: 'percent',
    value: 10,
  },
  {
    code: 'NUDO15',
    label: '15% de descuento en compras desde $60',
    type: 'percent',
    value: 15,
    minSubtotal: 60,
  },
  {
    code: 'BIENVENIDA5',
    label: '$5 de descuento en tu primer pedido',
    type: 'fixed',
    value: 5,
  },
  {
    code: 'ENVIOGRATIS',
    label: 'Envío gratis en cualquier pedido',
    type: 'shipping',
    value: 0,
  },
];

export const SHIPPING_FLAT = 5.9;
export const FREE_SHIPPING_THRESHOLD = 75;
export const TAX_RATE = 0.08;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export function formatPrice(value: number) {
  return formatter.format(value);
}
