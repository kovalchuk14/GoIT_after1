import { Car } from "@/types/Car";
import { nextServer } from "./api";

export async function fetchCarById(id: string): Promise<Car>{
    const res = await nextServer.get(`/cars/${id}`);
    return res.data;
}