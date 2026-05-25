"use client";
import "./VariantPicker.css";

interface Variant {
  id: string;
  label: string;
  available: boolean;
}

interface VariantPickerProps {
  label: string;
  variants: Variant[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function VariantPicker({ label, variants, selected, onSelect }: VariantPickerProps) {
  return (
    <fieldset className="variant-picker">
      <legend className="variant-picker__label">
        {label}: <span className="variant-picker__selected">{variants.find(v => v.id === selected)?.label}</span>
      </legend>
      <div className="variant-picker__options">
        {variants.map((v) => (
          <label
            key={v.id}
            className={`variant-picker__option ${v.id === selected ? "selected" : ""} ${!v.available ? "unavailable" : ""}`}
          >
            <input
              type="radio"
              name={label}
              value={v.id}
              checked={v.id === selected}
              onChange={() => onSelect(v.id)}
              disabled={!v.available}
            />
            {v.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
