import { Filters } from "@/types/Filters";
import { create } from "zustand";
import { persist } from "zustand/middleware";


type FiltersDraftStore = {
    draft: Filters;
    setDraft: (filter: Filters) => void,
};


const initialData: Filters = {
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
};
export const useFilterDraftStore = create<FiltersDraftStore>()(
    persist(
        (set) => ({
            draft: initialData,
            setDraft: (filter) => set(() => ({ draft: filter })),
        }),
    {
        name: 'filters-draft',
        partialize: (state) => ({draft:state.draft}),
    }
    )
);