import Link from "next/link";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm hover:border-primary/60 transition-colors"
    >
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="mb-3 h-40 w-full rounded-lg object-cover"
        />
      )}

      <h3 className="text-sm font-semibold text-slate-100">{product.name}</h3>

      <p className="mt-1 text-xs text-slate-400 line-clamp-2">
        {product.description}
      </p>

      <span className="mt-3 text-base font-semibold text-primary">
        ${(product.price / 100).toFixed(2)}
      </span>
    </Link>
  );
}
