"use client";

import { useRowLabel } from "@payloadcms/ui";

// Shows the row's name/title instead of "01" in collapsed array rows.
export const ArrayRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ name?: string; title?: string }>();
  return <span>{data?.name || data?.title || `Fila ${String((rowNumber ?? 0) + 1).padStart(2, "0")}`}</span>;
};
