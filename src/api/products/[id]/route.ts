import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: Request, {params}: {params: {id: string}}) {
  const {data, error} = await supabase
    .from("products")
    .select(`
      *,
      product_details(description)
      `)
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }

  return NextResponse.json(data);
}


/**
 * DELETE /api/products/:id
 */
export async function DELETE(req: Request, props: {params: Promise<{id: string}>}) {
  const {id} = await props.params; // 👈 NECESARIO EN APP ROUTER

  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
    method: "DELETE", headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""}`,
    },
  });

  // DELETE de Supabase NO retorna JSON → 204 No Content
  if (!response.ok) {
    console.error("❌ Error DELETE products:", await response.text());
    return NextResponse.json({error: "Failed to delete product"}, {status: 500});
  }

  return NextResponse.json({message: "Deleted"});
}

/**
 * PUT /api/products/:id
 */
export async function PUT(req: Request, props: {params: Promise<{id: string}>}) {
  const {id} = await props.params; // 👈 NECESARIO

  const body = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
    method: "PATCH", headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""}`,
      "Content-Type": "application/json",
    }, body: JSON.stringify(body),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("❌ Error UPDATE products:", result);
    return NextResponse.json({error: "Failed to update product"}, {status: 500});
  }

  return NextResponse.json(result);
}
