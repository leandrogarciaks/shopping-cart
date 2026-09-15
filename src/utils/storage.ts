import type { CartLine, Coupon } from '@/lib/shop';

export interface StorageProps {
  productCart: CartLine[];
  coupon?: Coupon | null;
}

export const saveCartState = ({ productCart, coupon }: StorageProps) => {
  localStorage.setItem(
    'productCartline',
    JSON.stringify({
      cartLine: productCart,
      coupon: coupon,
    }),
  );
};
