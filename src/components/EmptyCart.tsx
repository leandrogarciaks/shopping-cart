import { ShoppingBagIcon } from 'lucide-react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

// Estado vacío del carrito, ya maquetado.
// TODO(funcionalidad): renderizarlo dentro de <CartSummary /> cuando
// `lines.length === 0`.
export function EmptyCart() {
  return (
    <Empty className="border border-dashed py-8">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingBagIcon />
        </EmptyMedia>
        <EmptyTitle>Tu carrito está vacío</EmptyTitle>
        <EmptyDescription>
          Agrega productos del catálogo para ver el resumen y aplicar un cupón.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
