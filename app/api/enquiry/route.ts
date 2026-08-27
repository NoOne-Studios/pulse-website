import { NextResponse } from "next/server";

/**
 * Stub endpoint for the contact form. Validates and acknowledges only —
 * no storage, no CRM, no notification wired up yet.
 *
 * TODO(product): connect to a real destination (email, CRM, spreadsheet —
 * whatever is chosen) once one is decided. Nothing here is persisted.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const { name, mobile } = (body ?? {}) as { name?: unknown; mobile?: unknown };
  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ ok: false, error: "missing_name" }, { status: 400 });
  }
  if (typeof mobile !== "string" || !/^\d{10}$/.test(mobile.trim())) {
    return NextResponse.json({ ok: false, error: "invalid_mobile" }, { status: 400 });
  }

  console.log("[stub] enquiry received:", body);
  return NextResponse.json({ ok: true });
}
