# 🛒 Nudo Café — Carrito de compras

Aplicación de carrito de compras construida con **React 19 + TypeScript**, pensada como pieza de portfolio para mostrar manejo de estado complejo, persistencia en el navegador y una UI prolija con shadcn/ui.

El caso de uso es una tienda de café de especialidad: catálogo de productos, carrito con cantidades, cupones de descuento y cálculo de envío/impuestos en tiempo real.

## ✨ Funcionalidades

- **Catálogo de productos** con imagen, precio, notas de cata y stock.
- **Carrito de compras**: agregar, incrementar/decrementar cantidad y eliminar productos.
- **Cupones de descuento** con tres tipos de lógica: porcentaje, monto fijo y envío gratis.
- **Cálculo automático** de subtotal, impuestos, costo de envío (con umbral de envío gratis) y total.
- **Persistencia en `localStorage`**: el carrito y el cupón aplicado sobreviven a un refresh de la página.
- **Confirmación de compra** con un modal (SweetAlert2) antes de vaciar el carrito.
- **Estado vacío** dedicado cuando no hay productos en el carrito.
- UI construida con **shadcn/ui** y **Tailwind CSS v4**, totalmente responsive.

## 🧠 Decisiones técnicas

- **`useReducer` en vez de `useState` suelto**: todas las acciones del carrito (agregar, incrementar, decrementar, eliminar, aplicar cupón, completar compra, vaciar) viven en un único reducer (`cartReducer.ts`), lo que deja el flujo de datos predecible y fácil de testear.
- **Persistencia desacoplada**: la lectura/escritura de `localStorage` está aislada en `utils/storage.ts` y en el estado inicial del reducer, en vez de mezclarse con la lógica de UI.
- **Cálculos derivados en `App.tsx`**: subtotal, descuento, envío e impuestos se recalculan a partir del estado del carrito en cada render, evitando guardar valores derivados que puedan desincronizarse.

## 🛠️ Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) como bundler
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) para los componentes de UI
- [SweetAlert2](https://sweetalert2.github.io/) para el modal de confirmación
- [lucide-react](https://lucide.dev/) para los íconos
- ESLint para el linting

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── ui/                    # componentes base de shadcn/ui
│   ├── CartSummary.tsx        # resumen del carrito (líneas, totales, cupón)
│   ├── CouponField.tsx        # input de cupón y sus estados (vacío/error/aplicado)
│   ├── EmptyCart.tsx          # estado vacío del carrito
│   ├── Footer.tsx
│   └── ProductCard.tsx        # tarjeta de producto del catálogo
├── lib/
│   └── shop.ts                # datos de productos, cupones y constantes (envío, impuestos)
├── reducers/
│   └── cartReducer.ts         # lógica del carrito (agregar, cantidad, cupón, compra)
├── utils/
│   ├── storage.ts             # persistencia del carrito en localStorage
│   └── PopUpCompletePurchase.ts
├── App.tsx
└── main.tsx
```

## 🧪 Cupones de ejemplo

| Código        | Efecto                                |
| ------------- | ------------------------------------- |
| `CAFE10`      | 10% de descuento en todo el pedido    |
| `NUDO15`      | 15% de descuento en compras desde $60 |
| `BIENVENIDA5` | $5 de descuento en el primer pedido   |
| `ENVIOGRATIS` | Envío gratis en cualquier pedido      |

## 📌 Posibles mejoras a futuro

- Validar y dar feedback visual cuando se ingresa un cupón inexistente.
- Descontar stock disponible al agregar productos al carrito.
- Tests unitarios para el reducer del carrito.
- Checkout con formulario de datos de envío.
