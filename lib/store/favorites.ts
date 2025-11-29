import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoriteStore = {
  favorites: string[]; 
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) => {
        const favs = get().favorites;
        if (favs.includes(id)) {
          set({ favorites: favs.filter(f => f !== id) });
        } else {
          set({ favorites: [...favs, id] });
        }
      },
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: "favorites-store",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);