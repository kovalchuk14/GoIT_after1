"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import { fetchCarById } from "@/lib/api/clientApi";
import css from "./CarDetails.module.css";
import Image from "next/image";
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
                    <form>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            className={css.input}
                        />
                    </form>
                </div>
                <div>
                    <div>
                        <div>
                            <p>{`${car.brand} ${car.model}, ${car.year}`}</p>
                            <p>{car.id}</p>
                        </div>
                        <div>
                            <svg
                                width="11.25"
                                height="15"
                            >
                                <use href={`${spritePath}#icon-location`} />
                            </svg>
                            <p>{car.address}</p>
                            <p>Mileage: { car.mileage} km</p>
                        </div>
                        <p>${ car.rentalPrice}</p>
                        <p>{car.description}</p>
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </section>
    );
}