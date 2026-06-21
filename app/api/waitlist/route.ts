import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistRequestBody = {
  email?: unknown;
};

export async function POST(request: Request) {
  let body: WaitlistRequestBody;

  try {
    body = (await request.json()) as WaitlistRequestBody;
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!emailPattern.test(email)) {
    return Response.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("waitlist_signups")
      .upsert(
        {
          email,
          source: "landing",
          user_agent: request.headers.get("user-agent")
        },
        { onConflict: "email", ignoreDuplicates: true }
      );

    if (error) {
      console.error("Waitlist insert failed", error);
      return Response.json({ ok: false, error: "Could not join the waitlist." }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Waitlist route failed", error);
    return Response.json({ ok: false, error: "Waitlist is temporarily unavailable." }, { status: 500 });
  }
}
