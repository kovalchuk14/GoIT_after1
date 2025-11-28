import FilterBar from "@/components/FilterBar/FilterBar";
import CarList from "@/components/CarList/CarList";
import css from "./CatalogPage.module.css"

export default function CatalogPage() {
    return (
        <main>
            <FilterBar />
            <CarList />
            <button className={ css.buttonLoad}>Load more</button>
        </main>
    )
}