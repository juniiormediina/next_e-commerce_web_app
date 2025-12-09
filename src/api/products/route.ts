import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { createClient } from '@supabase/supabase-js';

export const dynamic = "force-dynamic";

// GET → listar productos
export async function GET() {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_details(description)
    `)
    .order("name");

  if (error) {
    console.error("❌ Error GET /products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST → crear producto
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabase = createClient(

      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // 👈 ESTA ES LA CLAVE CORRECTA
    );

    const { data, error } = await supabase
      .from("products")
      .insert([body])
      .select("*");

    if (error) {
      console.error("❌ Error inserción en products:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });

  } catch (error: any) {
    console.error("❌ Error POST /products:", error);
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }
}
