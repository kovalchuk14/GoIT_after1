"use client";

import css from "./CarList.module.css";
import Link from "next/link";
import Image from "next/image";
import { useFavoriteStore } from "@/lib/store/favorites";
import { useState } from "react";

const spritePath = "/sprite.svg";

function getCityCountry(fullAddress) {
  const parts = fullAddress.split(",").map(part => part.trim());
  return parts.slice(-2).join(", ");
}

export default function CarList({ cars }) {
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const isFavorite = useFavoriteStore((state) => state.isFavorite);

  const [favorites, setFavorites] = useState(() =>
    cars.reduce((acc, car) => {
      acc[car.id] = isFavoriteStore(car.id);
      return acc;
    }, {})
  );

  const handleFavorite = (carId) => {
    toggleFavorite(carId);
    setFavorites((prev) => ({ ...prev, [carId]: !prev[carId] }));
  };

  return (
    <div className="container">
      <ul className={css.list}>
        {cars.map((car) => (
          <li className={css.card} key={car.id}>
            <div className={css.imgContainer}>
              <Image
                src={car.img}
                width={276}
                height={268}
                className={css.carImage}
                alt={car.model || "Car"}
              />
              <svg width="16" height="16"
                className={`${css.favouriteSvg} ${isFavorite(car.id) ? css.fill : ""}`}
                onClick={() => {
                  handleFavorite(car.id);
                }}
              >
                <use href={`${spritePath}#icon-${isFavorite(car.id) ? "filled-" : ""}heart`} />
              </svg>
            </div>

            <div className={css.description}>
              <div className={css.title}>
                <p>
                  {car.brand} <span className={css.model}>{car.model}</span>{", "}
                  {car.year}
                </p>
                <p>${car.rentalPrice || "N/A"}</p>
              </div>

              <div className={css.info}>
                <p>
                  {getCityCountry(car.address)} | {car.rentalCompany} 
                </p>
                <p>{ car.type} | {car.mileage ? `${new Intl.NumberFormat("uk-UA").format(car.mileage)} km` : "Mileage N/A"}</p>
              </div>
            </div>

            <Link href={`/catalog/${car.id}`} className={css.button}>
              Read more
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
