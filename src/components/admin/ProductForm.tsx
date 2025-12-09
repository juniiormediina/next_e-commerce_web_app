"use client";

import { useState } from "react";
import type { Product } from "@/types/product";

type Props = {
  initial?: Product | null;
  onSaved: () => void;
};

export default function ProductForm({ initial, onSaved }: Props) {
  const [form, setForm] = useState<Product>(
    initial || {
      id: "",
      name: "",
      price: 0,
      stock: 0,
      category: "",
      image: ""
    }
  );

  const update = (k: keyof Product, v: any) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const save = async () => {
    if (initial) {
      const { id, ...data } = form; // ⬅️ NO ENVIAMOS EL ID EN PUT

      await fetch(`/api/products/${initial.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    } else {
      await fetch(`/api/products`, {
        method: "POST",
        body: JSON.stringify(form),
      });
    }

    onSaved();
  };


  return (
    <div className="p-4 border border-slate-700 rounded-xl bg-slate-900 space-y-4">
      <h2 className="text-xl font-semibold">
        {initial ? "Editar producto" : "Nuevo producto"}
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <input
          disabled={!!initial}
          value={form.id}
          onChange={(e) => update("id", e.target.value)}
          placeholder="ID"
          className="p-2 bg-slate-800 rounded"
        />

        <input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Nombre"
          className="p-2 bg-slate-800 rounded"
        />

        <input
          value={form.price}
          onChange={(e) => update("price", Number(e.target.value))}
          placeholder="Precio (centavos)"
          className="p-2 bg-slate-800 rounded"
        />

        <input
          value={form.stock}
          onChange={(e) => update("stock", Number(e.target.value))}
          placeholder="Stock"
          className="p-2 bg-slate-800 rounded"
        />

        <input
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
          placeholder="Categoría"
          className="p-2 bg-slate-800 rounded"
        />

        <input
          value={form.image}
          onChange={(e) => update("image", e.target.value)}
          placeholder="URL de imagen"
          className="p-2 bg-slate-800 rounded col-span-2"
        />
      </div>

      <button
        onClick={save}
        className="w-full py-2 bg-primary text-black rounded font-semibold"
      >
        {initial ? "Actualizar producto" : "Crear producto"}
      </button>
    </div>
  );
}
