"use client";

import { useRouter } from "next/navigation";
import { FilterPicker, type Filter } from "@/components/layout/FilterPicker";
import type { TopicValue } from "./format";

// Blog topic filter: the shared full-screen picker, driving the `tema` query
// param so filtered pages stay linkable and paginate on the server.
export function TopicFilter({ filters, active }: { filters: Filter<TopicValue>[]; active: TopicValue | null }) {
  const router = useRouter();
  const current = filters.find((f) => f.id === active) ?? filters[0];
  return (
    <FilterPicker
      filters={filters}
      active={current}
      label="Tema"
      title="Filtrar por tema"
      scrollTo="articulos"
      onPick={(id) => router.push(id ? `/influlab?tema=${id}` : "/influlab", { scroll: false })}
    />
  );
}
