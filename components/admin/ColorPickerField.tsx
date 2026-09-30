"use client";

import type { TextFieldClientComponent } from "payload";
import { FieldDescription, FieldError, FieldLabel, useField } from "@payloadcms/ui";

const HEX = /^#[0-9a-f]{6}$/i;

export const ColorPickerField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue, showError } = useField<string>({ path });
  const color = value && HEX.test(value) ? value : "#000000";

  return (
    <div className="field-type text">
      <FieldLabel label={field.label} path={path} required={field.required} />
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <input
          type="color"
          value={color}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Seleccionar color"
          style={{ width: 48, height: 40, padding: 0, border: "none", background: "none", cursor: "pointer" }}
        />
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => setValue(e.target.value)}
          placeholder="#6c3af0"
          maxLength={7}
          style={{ width: 120, fontFamily: "monospace" }}
        />
      </div>
      {showError && <FieldError path={path} showError={showError} />}
      <FieldDescription description={field.admin?.description} path={path} />
    </div>
  );
};
