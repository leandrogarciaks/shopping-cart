import { CartSummary } from '@/components/CartSummary';
import { ProductCard } from '@/components/ProductCard';
import {
  FREE_SHIPPING_THRESHOLD,
  products,
  SHIPPING_FLAT,
  TAX_RATE,
  type Product,
} from '@/lib/shop';
import { useEffect, useReducer } from 'react';
import { cartReducer, getInitialStateCartProduct } from './reducers/cartReducer';
import { saveCartState } from './utils/storage';
import { showCompletePurchasePopup } from './utils/PopUpCompletePurchase';

export default function App() {
  const [state, dispatch] = useReducer(cartReducer, getInitialStateCartProduct());

  const { productCart, coupon } = state;

  useEffect(() => {
    saveCartState({ productCart, coupon });
  }, [productCart, coupon]);

  const handleAddProduct = (product: Product) => {
    dispatch({
      type: 'ADD_CART',
      payload: product,
    });
  };

  const handleOnEmptyCart = () => {
    dispatch({
      type: 'EMPTY_CART',
    });
  };

  const handleDecrement = (id: string) => {
    dispatch({
      type: 'DECREMENT',
      payload: id,
    });
  };

  const handleIncrement = (id: string) => {
    dispatch({
      type: 'INCREMENT',
      payload: id,
    });
  };

  const handleRemoveProduct = (id: string) => {
    dispatch({
      type: 'REMOVE_PRODUCT',
      payload: id,
    });
  };

  const handleApplyDiscount = (value: string) => {
    dispatch({
      type: 'APPLY_DISCOUNT',
      payload: value,
    });
  };

  const handleCompletePurchase = async () => {
    const result = await showCompletePurchasePopup();

    if (result.isConfirmed) {
      dispatch({
        type: 'COMPLETE_PURCHASE',
      });
    }
  };

  const subtotal = productCart.reduce((accumulator, item) => {
    return accumulator + item.product.price * item.quantity;
  }, 0);

  let shippingCost: number = 0;
  let discount: number = 0;

  const subtotalAfterDiscount = subtotal - discount;

  subtotalAfterDiscount < FREE_SHIPPING_THRESHOLD
    ? (shippingCost = SHIPPING_FLAT)
    : (shippingCost = 0);

  switch (coupon?.type) {
    case 'percent':
      discount = (coupon.value * subtotal) / 100;
      break;

    case 'fixed':
      discount = coupon.value;
      break;

    case 'shipping':
      discount = coupon.value;
      shippingCost = 0;
      break;

    default:
      break;
  }

  const taxes = subtotal * TAX_RATE;
  let totals = 0;

  if (subtotal > 0) {
    totals = taxes + subtotal + shippingCost - discount;
  }

  return (
    <div className="min-h-svh">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 md:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary font-mono text-sm font-medium text-primary-foreground">
              N
            </span>
            <span className="text-base font-medium tracking-tight">Nudo Café</span>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Tostado semanal
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <div className="flex max-w-xl flex-col gap-3">
          <h1 className="text-3xl font-medium tracking-tight text-balance md:text-4xl">
            Café de especialidad y equipo para prepararlo
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
            Maquetado estático del carrito. Los botones, cantidades y el campo de cupón están listos
            para que les conectes la lógica.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-10">
          <section aria-labelledby="catalogo">
            <h2
              id="catalogo"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              Catálogo · {products.length} productos
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddProduct={() => handleAddProduct(product)}
                />
              ))}
            </div>
          </section>

          <aside aria-label="Resumen del carrito">
            <CartSummary
              onEmptyCart={handleOnEmptyCart}
              productCart={state.productCart}
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              onRemove={handleRemoveProduct}
              subtotal={subtotal}
              onApplyDiscount={handleApplyDiscount}
              discount={discount}
              shippingCost={subtotal ? shippingCost : 0}
              taxes={taxes}
              totals={totals}
              onCompletePurchase={handleCompletePurchase}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}
