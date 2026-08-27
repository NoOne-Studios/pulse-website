import { NextResponse } from "next/server";

/**
 * Stub endpoint for the homepage waitlist CTA. Validates and acknowledges
 * only — no storage, no email provider wired up yet.
 *
 * TODO(product): connect to a real waitlist store / email service once one
 * is chosen. Nothing here is persisted.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = (body as { email?: unknown } | null)?.email;
  if (typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  console.log("[stub] waitlist signup:", email);
  return NextResponse.json({ ok: true });
}
