import { PlusIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatPrice, type Product } from '@/lib/shop';

export interface Props {
  product: Product;
  onAddProduct: (product: Product) => void;
}

export function ProductCard({ product, onAddProduct }: Props) {
  return (
    <Card className="overflow-hidden pt-0 transition-colors hover:border-primary/40">
      <div className="relative aspect-square bg-secondary">
        <img
          src={`${import.meta.env.BASE_URL}${product.image.replace(/^\//, '')}`}
          alt={product.name}
          className="absolute inset-0 size-full object-cover"
        />
        {product.tag ? <Badge className="absolute left-3 top-3">{product.tag}</Badge> : null}
      </div>

      <CardHeader>
        <CardTitle className="text-base">{product.name}</CardTitle>
        <CardDescription>{product.origin}</CardDescription>
        <CardAction className="font-mono text-sm tabular-nums">
          {formatPrice(product.price)}
        </CardAction>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{product.notes}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
          {product.stock} disp.
        </span>
        <Button size="sm" onClick={() => onAddProduct(product)}>
          <PlusIcon data-icon="inline-start" />
          Agregar
        </Button>
      </CardFooter>
    </Card>
  );
}
