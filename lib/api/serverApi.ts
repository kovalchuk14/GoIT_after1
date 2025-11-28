import { cookies } from "next/headers";
import { nextServer } from "./api";
import { Car } from "@/types/Car";

export async function fetchCarById(id: string): Promise<Car>{
  const cookieStore = await cookies()
  const res = await nextServer.get(`/cars/${id}`,{
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
    return res.data;
}