import type { CartLine, Coupon, Product } from '@/lib/shop';
import { coupons } from '../lib/shop';

export interface CartProductState {
  productCart: CartLine[];
  coupon?: Coupon | null;
}

export interface SavedCartLocalStorage {
  cartLine: CartLine[];
  coupon?: Coupon | null;
}

export const getInitialStateCartProduct = (): CartProductState => {
  const savedCartProduct = localStorage.getItem('productCartline');

  if (!savedCartProduct) {
    return {
      productCart: [],
      coupon: null,
    };
  }

  try {
    const data: SavedCartLocalStorage = JSON.parse(savedCartProduct);
    console.log(data);
    const resultCartLine = data.cartLine;
    const resutlCoupon = data.coupon;

    return {
      productCart: resultCartLine,
      coupon: resutlCoupon,
    };
  } catch (error) {
    return {
      productCart: [],
      coupon: null,
    };
  }
};

export type CartProductActions =
  | { type: 'ADD_CART'; payload: Product }
  | { type: 'APPLY_DISCOUNT'; payload: string }
  | { type: 'INCREMENT'; payload: string }
  | { type: 'DECREMENT'; payload: string }
  | { type: 'REMOVE_PRODUCT'; payload: string }
  | { type: 'COMPLETE_PURCHASE' }
  | { type: 'EMPTY_CART' };

export const cartReducer = (
  state: CartProductState,
  action: CartProductActions,
): CartProductState => {
  switch (action.type) {
    case 'ADD_CART': {
      console.log(action.payload);

      const itemInCart = state.productCart.find((item) => item.product.id === action.payload.id);

      console.log('itemInCart', itemInCart);

      return itemInCart
        ? {
            ...state,
            productCart: state.productCart.map((item) => {
              return item.product.id === action.payload.id
                ? { product: item.product, quantity: item.quantity + 1 }
                : item;
            }),
          }
        : {
            ...state,
            productCart: [...state.productCart, { product: action.payload, quantity: 1 }],
          };
    }

    case 'APPLY_DISCOUNT': {
      const couponExists = coupons.find((item) => item.code === action.payload);

      return couponExists
        ? {
            ...state,
            coupon: couponExists,
          }
        : {
            ...state,
            coupon: null,
          };
    }

    case 'INCREMENT': {
      const updateCart = state.productCart.map((item) => {
        if (item.product.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });

      return {
        ...state,
        productCart: updateCart,
      };
    }

    case 'DECREMENT': {
      const updateCart = state.productCart
        .map((item) => {
          if (item.product.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        })
        .filter((item) => item?.quantity > 0);

      return {
        ...state,
        productCart: updateCart,
      };
    }

    case 'REMOVE_PRODUCT': {
      const updateCart = state.productCart.filter((item) => item.product.id !== action.payload);

      return {
        ...state,
        productCart: updateCart,
      };
    }

    case 'COMPLETE_PURCHASE': {
      return {
        productCart: [],
      };
    }

    case 'EMPTY_CART': {
      return {
        productCart: [],
      };
    }

    default:
      return state;
  }
};
