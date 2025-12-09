"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

type Props = {
  onEdit: (p: Product) => void;
};

export default function ProductTable({ onEdit }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  const load = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    load();
  }, []);

  const deleteProduct = async (id: string) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <table className="w-full text-sm border border-slate-700 rounded-xl overflow-hidden">
      <thead className="bg-slate-800 text-slate-300">
      <tr>
        <th className="p-2">ID</th>
        <th className="p-2">Nombre</th>
        <th className="p-2">Precio</th>
        <th className="p-2">Stock</th>
        <th className="p-2 w-32">Acciones</th>
      </tr>
      </thead>

      <tbody>
      {products.map((p) => (
        <tr key={p.id} className="border-t border-slate-700">
          <td className="p-2">{p.id}</td>
          <td className="p-2">{p.name}</td>
          <td className="p-2">${(p.price / 100).toFixed(2)}</td>
          <td className="p-2">{p.stock}</td>
          <td className="p-2 flex gap-3">
            <button className="text-blue-400" onClick={() => onEdit(p)}>
              Editar
            </button>
            <button className="text-red-400" onClick={() => deleteProduct(p.id)}>
              Eliminar
            </button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}
