import Image from "next/image";
import type { CaseStudy, Media } from "@/payload-types";

// Case study card: cover, brand, title, objective and two headline results.
export function CaseCard({ item }: { item: CaseStudy }) {
  const cover = item.cover && typeof item.cover === "object" ? (item.cover as Media) : null;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-200">
      {cover?.url && (
        <div className="relative aspect-[16/10]">
          <Image src={cover.url} alt={cover.alt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase text-secondary">{item.brandName}</p>
        <h3 className="mt-2 text-xl font-bold leading-snug">{item.title}</h3>
        <p className="mt-2 text-base-content/70">{item.objective}</p>
        <dl className="mt-auto grid grid-cols-2 gap-4 pt-6">
          {(item.results ?? []).slice(0, 2).map((r) => (
            <div key={r.id}>
              <dt className="text-xs uppercase text-base-content/60">{r.label}</dt>
              <dd className="text-2xl font-bold">{r.name}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
