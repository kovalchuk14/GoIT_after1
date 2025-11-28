"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import { fetchCarById } from "@/lib/api/clientApi";
import css from "./CarDetails.module.css";
import Image from "next/image";
import CarForm from "@/components/CarForm/CarForm"

const spritePath = "/sprite.svg";

export default function CarDetailsClient() {
    const { id } = useParams<{ id: string }>();
    const { data: car, isLoading, isError } = useQuery({
        queryKey: ["car", id],
        queryFn: () => fetchCarById(id),
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>;

    if (isError) return <p>Something went wrong.</p>;
    if (!car) return null;




    return (
        <section className={css.carPage}>
            <div className={css.container}>
                <div className={css.photoAndForm}>
                    <Image
                        src={car.img}
                        width={700}
                        height={100}
                        className={css.carImage}
                        alt={car.model}
                    />
                    <CarForm />
                </div>
                <div>
                    <div className={css.carMainInfo}>
                        <div className={css.carPreview}>
                            <h2 className={css.carTitle}>{`${car.brand} ${car.model}, ${car.year}`}</h2>
                            <p className={css.carId}>id: {car.id}</p>
                        </div>
                        <div className={css.carLocation}>
                            <svg
                                width="16"
                                height="16"
                            >
                                <use href={`${spritePath}#icon-location`} />
                            </svg>
                            <p className={css.carAddress}>{car.address}</p>
                            <p>Mileage: {new Intl.NumberFormat("uk-UA").format(car.mileage)} km</p>
                        </div>
                        <p className={css.carPrice}>${car.rentalPrice}</p>
                        <p className={css.carDescription}>{car.description}</p>
                    </div>
                    <div className={css.carSecondInfo}>
                        <div>
                            <p className={css.carInfoTitle}>Rental Conditions: </p>
                            <ul className={css.carInfoContainer}>
                                {car.rentalConditions.map((item, idx) => (
                                    
                                    <li key={idx} className={css.carInfoItem}>
                                        <svg
                                            width="16"
                                            height="16"
                                        >
                                            <use href={`${spritePath}#icon-confirm`} />
                                        </svg>
                                        <p>{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className={css.carInfoTitle}>Car Specifications:</p>
                            <ul className={css.carInfoContainer}>
                                <li className={css.carInfoItem}>
                                        <svg
                                            width="16"
                                            height="16"
                                        >
                                            <use href={`${spritePath}#icon-calendar`} />
                                        </svg>
                                        <p>Year: {car.year}</p>
                                </li>
                                <li className={css.carInfoItem}>
                                        <svg
                                            width="16"
                                            height="16"
                                        >
                                            <use href={`${spritePath}#icon-auto`} />
                                        </svg>
                                        <p>Type: {car.type}</p>
                                </li>
                                <li className={css.carInfoItem}>
                                        <svg
                                            width="16"
                                            height="16"
                                        >
                                            <use href={`${spritePath}#icon-gas`} />
                                        </svg>
                                        <p>Fuel Consumption: {car.fuelConsumption}</p>
                                </li>
                                <li className={css.carInfoItem}>
                                        <svg
                                            width="16"
                                            height="16"
                                        >
                                            <use href={`${spritePath}#icon-setting`} />
                                        </svg>
                                        <p>Engine Size: {car.engineSize}</p>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className={css.carInfoTitle}>Accessories and functionalities:</p>
                            <ul className={css.carInfoContainer}>
                                {[...car.accessories, ...car.functionalities].map((item, idx) => (
                                    
                                    <li key={idx} className={css.carInfoItem}>
                                        <svg
                                            width="16"
                                            height="16"
                                        >
                                            <use href={`${spritePath}#icon-confirm`} />
                                        </svg>
                                        <p>{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}