//
//
// import type { Product } from "@/types/product";
// import { supabase } from "./supabase";
//
//
// export async function getProducts(): Promise<Product[]> {
//   const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/make-server-e148ac82/products`;
//
//   const res = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
//     },
//   });
//
//   if (!res.ok) {
//     console.error("Error calling products function:", await res.text());
//     return [];
//   }
//
//   const data = await res.json();
//
//   // Normalización universal
//   if (Array.isArray(data)) return data as Product[];
//   if (data?.products && Array.isArray(data.products)) return data.products;
//
//   // Fallback seguro
//   return [];
// }
//
// export async function getProductById(id: string) {
//   // Obtener producto principal
//   const { data: product, error: productError } = await supabase
//     .from("products")
//     .select("*")
//     .eq("id", id)
//     .single();
//
//   if (productError) {
//     console.error("❌ Error producto:", productError);
//     return null;
//   }
//
//   // Obtener detalle
//   const { data: details, error: detailError } = await supabase
//     .from("product_details")
//     .select("*")
//     .eq("product_id", id)
//     .single();
//
//   if (detailError) {
//     console.warn("⚠️ Producto sin detalles extendidos:", detailError.message);
//   }
//
//   return {
//     ...product,
//     details: details || null
//   };
// }

import { supabase } from "./supabase";
import type { Product } from "@/types/product";

/**
 * Devuelve listado de productos uniendo products + product_details
 */
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, image, price, stock, category, product_details ( description )");

  if (error) {
    console.error("❌ Supabase getProducts error:", error);
    return [];
  }

  // data aquí es any[], mapeamos a nuestro tipo Product
  const rows = Array.isArray(data) ? data : [];

  return rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    image: row.image,
    // convertir de centavos a unidades
    price: (row.price ?? 0) / 100,
    stock: row.stock ?? 0,
    category: row.category ?? "",
    description: row.product_details?.description ?? ""
  }));
}

/**
 * Devuelve un solo producto por id uniendo products + product_details
 */
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, image, price, stock, category, product_details ( description )")
    .eq("id", id)
    .maybeSingle(); // si no hay, devuelve null

  if (error) {
    console.error("❌ Supabase getProductById error:", error);
    return null;
  }

  if (!data) return null;

  const row: any = data;

  return {
    id: row.id,
    name: row.name,
    image: row.image,
    price: (row.price ?? 0) / 100,
    stock: row.stock ?? 0,
    category: row.category ?? "",
    description: row.product_details?.description ?? ""
  };
}

