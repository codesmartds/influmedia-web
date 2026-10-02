import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { resetContent, seed } from "@/lib/seed";

// Seed endpoints for any environment. Both require a logged-in admin:
// Payload reads the session cookie (or an Authorization header).
//   POST   /api/seed            add or update the seed content
//   POST   /api/seed?reset=1    delete seeded content and files, then seed
//   DELETE /api/seed            delete seeded content and files only
async function requireUser() {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });
  return user;
}

export async function POST(request: Request) {
  if (!(await requireUser())) return Response.json({ error: "No autorizado" }, { status: 401 });

  const reset = new URL(request.url).searchParams.get("reset");
  const removed = reset ? await resetContent() : null;
  await seed();
  // The seed skips per-document revalidation; refresh every page once.
  revalidatePath("/", "layout");
  return Response.json({ ok: true, removed });
}

export async function DELETE() {
  if (!(await requireUser())) return Response.json({ error: "No autorizado" }, { status: 401 });

  const removed = await resetContent();
  revalidatePath("/", "layout");
  return Response.json({ ok: true, removed });
}
