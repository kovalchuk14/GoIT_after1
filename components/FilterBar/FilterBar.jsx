


"use client";

import { useState, useEffect } from "react";
import Select from "../Select/Select";
import css from "./FilterBar.module.css";
import { fetchBrands } from "@/lib/api/clientApi";

const priceOptions = ["30", "40", "50", "60", "70", "80"];

export default function FilterBar({ filters, onSearch }) {
  const [brands, setBrands] = useState([]);
  const [localFilters, setLocalFilters] = useState(filters);

useEffect(() => {
  setLocalFilters(filters);
}, [filters]);
  

  useEffect(() => {
    const loadBrands = async () => {
      const data = await fetchBrands();
      setBrands(data);
    };
    loadBrands();
  }, []);

  const update = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={css.container}>
      <div>
        <p className={css.params}>Car brand</p>
        <Select
          options={brands}
          value={localFilters.brand}
          onChange={(v) => update("brand", v)}
          placeholder="Choose a brand"
        />
      </div>

      <div>
        <p className={css.params}>Price / 1 hour</p>
        <Select
          options={priceOptions}
          value={localFilters.rentalPrice}
          onChange={(v) => update("rentalPrice", v)}
          placeholder="Choose a price"
        />
      </div>

      <div>
        <p className={css.params}>Сar mileage / km</p>
        <div className={css.doubleInput}>
          <input
            placeholder="From"
            value={localFilters.minMileage}
                      onChange={(e) => update("minMileage", e.target.value)}
                      className={css.inputField}
          />
          <div className={css.separator}></div>
          <input
            placeholder="To"
            value={localFilters.maxMileage}
                      onChange={(e) => update("maxMileage", e.target.value)}
                      className={css.inputField}
          />
        </div>
      </div>

      <button onClick={() => onSearch(localFilters)} className={css.button}>
        Search
      </button>
    </div>
  );
}
