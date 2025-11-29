"use client";

import { useState, useEffect } from "react";
import FilterBar from "@/components/FilterBar/FilterBar";
import CarList from "@/components/CarList/CarList";
import css from "./CatalogPage.module.css";
import { Car } from "@/types/Car";
import { fetchCars } from "@/lib/api/clientApi";
import { useFilterDraftStore } from "@/lib/store/filter";
import { Filters } from "@/types/Filters";



export default function CatalogPage() {
  const [filters, setFilters] = useState<Filters>({ brand: "", rentalPrice: "", minMileage: "", maxMileage: "" });
  const { draft, setDraft } = useFilterDraftStore();
  
 
  console.log(draft);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  

  const handleSearch = async (newFilters: Filters) => {
    setDraft(newFilters);
    setFilters(newFilters);
    setPage(1);
    const filteredParams = Object.fromEntries(
    Object.entries(newFilters).filter(([_, value]) => value !== "")
    );
    setIsLoading(true); 
    const data = await fetchCars(filteredParams, 1);
    setCars(data.cars);
    setHasMore(data.totalPages>1);
    setIsLoading(false);
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    const filteredParams = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== "")
    );
    setIsLoading(true);
    const data = await fetchCars(filteredParams, nextPage);
    setCars((prev) => [...prev, ...data.cars]);
    setPage(nextPage);
    setHasMore(nextPage < data.totalPages);
    setIsLoading(false); 
  };
  

useEffect(() => {
  setFilters(draft);
}, [draft]);


useEffect(() => {
  const fetchInitial = async () => {
    setIsLoading(true);

    const filteredParams = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "")
    );

    const data = await fetchCars(filteredParams, 1);

    setCars(data.cars);
    setPage(1);
    setHasMore(data.totalPages > 1);

    setIsLoading(false);
  };

  fetchInitial();
}, [filters]);

  
  return (
    <main>
      <section className={ css.section}>

      <FilterBar filters={filters} onSearch={handleSearch} />
      {isLoading && <p className={css.loading}>Loading...</p>}
      <CarList cars={cars} />

      {hasMore && cars.length > 0 && (
        <button onClick={handleLoadMore} className={css.buttonLoad}>
          Load more
        </button>
      )}
      </section>
    </main>
  );
}
