import { MinusIcon, PlusIcon, ShoppingBagIcon, Trash2Icon, TruckIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CouponField } from '@/components/CouponField';
import { formatPrice, type CartLine } from '@/lib/shop';

export interface RowProps {
  label: string;
  value: string;
  emphasis?: boolean;
}

export interface CartLineItemProps {
  line: CartLine;
  onDecrement: (id: string) => void;
  onIncrement: (id: string) => void;
  onRemove: (id: string) => void;
}

export interface CartSummaryProps {
  productCart: CartLine[];
  onEmptyCart: () => void;
  onDecrement: (id: string) => void;
  onIncrement: (id: string) => void;
  onRemove: (id: string) => void;
  subtotal: number;
  onApplyDiscount: (value: string) => void;
  discount: number;
  shippingCost: number;
  taxes: number;
  totals: number;
  onCompletePurchase: () => void;
}

// Fila de totales reutilizable.
function Row({ label, value, emphasis }: RowProps) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className={emphasis ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>
      <span
        className={
          emphasis
            ? 'font-mono tabular-nums text-primary'
            : 'font-mono tabular-nums text-foreground'
        }
      >
        {value}
      </span>
    </div>
  );
}

// Línea del carrito con sus controles de cantidad (inertes).
// TODO(funcionalidad): recibir onIncrement / onDecrement / onRemove por props.
function CartLineItem({ line, onDecrement, onIncrement, onRemove }: CartLineItemProps) {
  return (
    <li className="flex items-start gap-3">
      <div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-secondary">
        <img src={line.product.image} alt="" className="absolute inset-0 size-full object-cover" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">{line.product.name}</span>
            <span className="font-mono text-xs text-muted-foreground">
              {formatPrice(line.product.price)} c/u
            </span>
          </div>
          <span className="font-mono text-sm tabular-nums">
            {formatPrice(line.product.price * line.quantity)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            aria-label={`Quitar una unidad de ${line.product.name}`}
            onClick={() => onDecrement(line.product.id)}
          >
            <MinusIcon />
          </Button>
          <span className="w-8 text-center font-mono text-sm tabular-nums">{line.quantity}</span>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label={`Agregar una unidad de ${line.product.name}`}
            onClick={() => onIncrement(line.product.id)}
          >
            <PlusIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="ml-auto text-muted-foreground"
            aria-label={`Eliminar ${line.product.name} del carrito`}
            onClick={() => onRemove(line.product.id)}
          >
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </li>
  );
}

// Resumen del pedido: valores fijos, sin cálculos.
// TODO(funcionalidad): recibir `lines` y `totals` por props y calcular
// subtotal, descuento, envío e impuestos en tu lógica de carrito.
export function CartSummary({
  productCart,
  onEmptyCart,
  onDecrement,
  onIncrement,
  onRemove,
  subtotal,
  onApplyDiscount,
  discount,
  shippingCost,
  taxes,
  totals,
  onCompletePurchase,
}: CartSummaryProps) {
  return (
    <Card className="gap-4 lg:sticky lg:top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBagIcon className="size-4" />
          Resumen del pedido
        </CardTitle>
        <CardAction>
          <Badge variant="secondary" className="font-mono tabular-nums">
            {productCart.length}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <ul className="flex flex-col gap-4">
          {productCart.length > 0 ? (
            productCart.map((line) => (
              <CartLineItem
                key={line.product.id}
                line={line}
                onDecrement={() => onDecrement(line.product.id)}
                onIncrement={() => onIncrement(line.product.id)}
                onRemove={() => onRemove(line.product.id)}
              />
            ))
          ) : (
            <p className="bg-gray-600 p-3 rounded-sm">Aún no hay productos agregados al carrito</p>
          )}
        </ul>

        <Separator />

        <CouponField onApplyDiscount={onApplyDiscount} />

        <Separator />

        <div className="flex flex-col gap-2.5">
          <Row label="Subtotal" value={formatPrice(subtotal)} />
          <Row label="Descuento" value={`- ${formatPrice(discount)}`} emphasis />
          <Row label="Envío" value={formatPrice(shippingCost)} />
          <Row label="Impuestos (8%)" value={formatPrice(taxes)} />
        </div>

        <div className="border-t border-dashed pt-4">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm font-medium">Total</span>
            <span className="font-mono text-2xl tabular-nums tracking-tight">
              {formatPrice(totals)}
            </span>
          </div>
        </div>

        <p className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          <TruckIcon className="size-4 shrink-0" />
          Te faltan <span className="font-mono text-foreground">{formatPrice(26)}</span> para el
          envío gratis.
        </p>
      </CardContent>

      {productCart.length > 0 ? (
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" onClick={onCompletePurchase}>
            Finalizar compra
          </Button>
          <Button variant="ghost" className="w-full" onClick={onEmptyCart}>
            Vaciar carrito
          </Button>
        </CardFooter>
      ) : (
        <CardFooter className="flex flex-col gap-2"></CardFooter>
      )}
    </Card>
  );
}
