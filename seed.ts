import { resetContent, seed } from "@/lib/seed";

// CLI entry. The same logic runs in production through /api/seed.
//   npm run seed          add or update the seed content
//   npm run seed:reset    delete all seeded content and files, then seed again
// No `users` are ever seeded: the first admin is created from /admin.
if (process.argv.includes("--reset")) await resetContent();
await seed();
process.exit(0);
