import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type KabumProduct = {
  description?: string;
  price?: number;
  priceWithDiscount?: number;
};

function findProducts(value: unknown, out: KabumProduct[] = []): KabumProduct[] {
  if (Array.isArray(value)) {
    for (const item of value) findProducts(item, out);
  } else if (value && typeof value === "object") {
    const rec = value as Record<string, unknown>;
    if (typeof rec.price === "number" && typeof rec.description === "string") {
      out.push(rec as KabumProduct);
    }
    for (const nested of Object.values(rec)) findProducts(nested, out);
  }
  return out;
}

export async function GET(request: NextRequest) {
  const nome = request.nextUrl.searchParams.get("nome");
  if (!nome) {
    return NextResponse.json({ price: null, updated: false }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(
      `https://www.kabum.com.br/busca/${encodeURIComponent(nome)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json({ price: null, updated: false });
    }

    const html = await res.text();
    const match = html.match(
      /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/
    );
    if (!match) {
      return NextResponse.json({ price: null, updated: false });
    }

    const data = JSON.parse(match[1]);
    const products = findProducts(data);
    const best = products[0];

    if (!best || typeof best.price !== "number") {
      return NextResponse.json({ price: null, updated: false });
    }

    const price =
      typeof best.priceWithDiscount === "number" &&
      best.priceWithDiscount < best.price
        ? best.priceWithDiscount
        : best.price;

    return NextResponse.json({ price, updated: true });
  } catch {
    return NextResponse.json({ price: null, updated: false });
  }
}
