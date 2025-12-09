"use client";

import { useState } from "react";
import ProductTable from "../../components/admin/ProductTable";
import ProductForm from "../../components/admin/ProductForm";
import type { Product } from "@/types/product";

export default function AdminPage() {
  const [editing, setEditing] = useState<Product | null>(null);
  const [reload, setReload] = useState(false);

  const refresh = () => {
    setEditing(null);
    setReload(!reload);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold">Panel de administración</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductForm initial={editing} onSaved={refresh} />

        <div>
          <ProductTable key={reload ? "a" : "b"} onEdit={setEditing} />
        </div>
      </div>
    </div>
  );
}
