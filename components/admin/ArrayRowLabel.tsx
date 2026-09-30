"use client";

import { useRowLabel } from "@payloadcms/ui";

// Shows the row's `name` instead of "Marca 01" in collapsed array rows.
export const ArrayRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ name?: string }>();
  return <span>{data?.name || `Marca ${String((rowNumber ?? 0) + 1).padStart(2, "0")}`}</span>;
};
