import { resetContent, seed } from "@/lib/seed";

// CLI entry: `npm run seed` cleans up the seeded collections (and their
// uploads), then inserts the data again. The same runs in production
// through POST /api/seed. No `users` are ever seeded or touched.
await resetContent();
await seed();
process.exit(0);
