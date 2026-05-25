"use client";
import "./QuantitySelector.css";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
  productTitle: string;
}

export default function QuantitySelector({ quantity, onChange, min = 1, max, productTitle }: QuantitySelectorProps) {
  return (
    <div className="quantity-selector">
      <label className="quantity-selector__label">Quantity</label>
      <div className="quantity-selector__controls">
        <button
          className="quantity-selector__btn"
          onClick={() => onChange(Math.max(min, quantity - 1))}
          disabled={quantity <= min}
          aria-label={`Decrease quantity for ${productTitle}`}
        >
          <svg viewBox="0 0 10 2" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" /></svg>
        </button>
        <input
          className="quantity-selector__input"
          type="number"
          value={quantity}
          min={min}
          max={max ?? undefined}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val >= min) onChange(val);
          }}
        />
        <button
          className="quantity-selector__btn"
          onClick={() => onChange(max ? Math.min(max, quantity + 1) : quantity + 1)}
          disabled={max !== undefined && quantity >= max}
          aria-label={`Increase quantity for ${productTitle}`}
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><path strokeLinecap="round" d="M10 4v12M4 10h12" /></svg>
        </button>
      </div>
    </div>
  );
}
