import { seed } from "@/lib/seed";

// CLI entry: `npm run seed`. The same logic runs in production through the
// authenticated POST /api/seed. No `users` are ever seeded: the first admin
// is created from /admin.
await seed();
process.exit(0);
