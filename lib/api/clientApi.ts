import { Car } from "@/types/Car";
import { nextServer } from "./api";
import { Filters } from "@/types/Filters";


export async function fetchCarById(id: string): Promise<Car>{
    const res = await nextServer.get(`/cars/${id}`);
    return res.data;
}

export async function fetchBrands(): Promise<string[]>{
    const res = await nextServer.get(`/brands`);
    return res.data;
}

export async function fetchCars(filters: Filters, page = 1, limit = 12){
    const params = new URLSearchParams({ ...filters, page: page.toString(),limit:limit.toString() });
    const res = await nextServer.get(`/cars?${params.toString()}`);
    return res.data;
};