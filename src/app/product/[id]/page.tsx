import { getProductById } from "@/lib/products";
import type { Product } from "@/types/product";

export default async function ProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const product: Product | null = await getProductById(id);
  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-slate-400">
        <h1 className="text-xl font-semibold mb-3">Producto no encontrado</h1>
        <p className="text-sm">El producto no existe o fue eliminado.</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* Imagen del producto */}
      <div>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl shadow-lg border border-slate-800 object-cover w-full"
          />
        ) : (
          <div className="w-full h-64 rounded-xl bg-slate-800 animate-pulse" />
        )}
      </div>

      {/* Información */}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="mt-2 text-base text-slate-400">
          {product.description}
        </p>

        <p className="mt-4 text-2xl font-bold text-primary">
          ${(product.price / 100).toFixed(2)}
        </p>

        {product.stock !== undefined && (
          <p className="mt-2 text-sm text-slate-400">
            Stock disponible: {product.stock}
          </p>
        )}
      </div>

    </section>
  );
}
