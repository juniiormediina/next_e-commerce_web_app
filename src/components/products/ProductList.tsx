"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { getProducts } from "@/lib/products";
import type { Product } from "@/types/product";

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <p className="mx-auto mt-10 text-center text-slate-400">
        Cargando productos…
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="mx-auto mt-10 text-center text-slate-400">
        No hay productos disponibles.
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
