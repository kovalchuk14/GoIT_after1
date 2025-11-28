"use client";
import { useState, useRef, useEffect } from "react";
import css from "./Select.module.css";
import clsx from "clsx";

const spritePath = "/sprite.svg";

type SelectProps = {
  options: string[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

export default function Select({
  options,
  value: externalValue,
  placeholder = "Select...",
  onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(externalValue || "");
  const ref = useRef<HTMLDivElement>(null);

  const value = externalValue !== undefined ? externalValue : internalValue;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleSelect = (val: string) => {
    setInternalValue(val);
    onChange?.(val);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className={css.filterList}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>
          {value || placeholder}
        </span>
        <svg
          width="16"
          height="16"
          className={clsx(
            "block transform transition-transform duration-200",
            open ? "rotate-180" : "rotate-0"
          )}
        >
          <use href={`${spritePath}#icon-up`} />
        </svg>
      </button>

      <div className={`${css.dropdown} ${open ? css.open : ""}`}>
        <ul className={css.dropdownList}>
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`${css.dropdownItem} ${opt === value ? css.selected : ""}`}
            >
              {opt}
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
}
