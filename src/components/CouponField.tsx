import { TagIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { coupons } from '@/lib/shop';
import { useState } from 'react';

export interface CouponFieldProps {
  onApplyDiscount: (value: string) => void;
}

// Campo de cupón: solo maquetado.
// TODO(funcionalidad): controlar el input con useState, validar el código
// contra `coupons` y avisar al carrito con un callback `onApply`.
export function CouponField({ onApplyDiscount }: CouponFieldProps) {
  const [coupon, setCoupon] = useState('');

  return (
    <Field>
      <FieldLabel htmlFor="coupon">Cupón de descuento</FieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <TagIcon />
        </InputGroupAddon>
        <InputGroupInput
          id="coupon"
          placeholder="Ej. CAFE10"
          autoComplete="off"
          onChange={(e) => setCoupon(e.target.value)}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={() => onApplyDiscount(coupon)}>Aplicar</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>
        Códigos de ejemplo:{' '}
        {coupons.map((coupon, index) => (
          <span key={coupon.code} className="font-mono">
            {coupon.code}
            {index < coupons.length - 1 ? ', ' : '.'}
          </span>
        ))}
      </FieldDescription>
    </Field>
  );
}

// Estado de error del mismo campo, ya maquetado por si lo necesitas.
export function CouponFieldError({
  message = 'El cupón no existe o expiró.',
}: {
  message?: string;
}) {
  return (
    <Field data-invalid>
      <FieldLabel htmlFor="coupon-error">Cupón de descuento</FieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <TagIcon />
        </InputGroupAddon>
        <InputGroupInput id="coupon-error" defaultValue="CAFE99" aria-invalid autoComplete="off" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Aplicar</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>{message}</FieldDescription>
    </Field>
  );
}

// Estado con cupón aplicado. Reemplaza a <CouponField /> cuando haya uno activo.
export function AppliedCoupon({
  code = 'CAFE10',
  label = '10% de descuento en todo el pedido',
}: {
  code?: string;
  label?: string;
}) {
  return (
    <Field>
      <FieldLabel>Cupón de descuento</FieldLabel>
      <div className="flex items-start justify-between gap-3 rounded-md border border-primary/30 bg-accent px-3 py-2.5">
        <div className="flex items-start gap-2.5">
          <TagIcon className="mt-0.5 size-4 shrink-0 text-primary" />
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-sm font-medium text-accent-foreground">{code}</span>
            <span className="text-xs leading-relaxed text-muted-foreground">{label}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon-sm" aria-label={`Quitar cupón ${code}`}>
          <XIcon />
        </Button>
      </div>
    </Field>
  );
}
