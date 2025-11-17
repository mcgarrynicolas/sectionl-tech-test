import axios from "axios";
import type { StrapiResponse, Gems } from "../types/api";

const API_URL = `https://content.section-l.co/api/city-gems`

export async function getCityGemsNearNeighborhoods(neighborhoods: number[]): Promise<Gems[]> {
  const qs = neighborhoods.map((nb) => `filters[neighborhoods][id][$eq]=${nb}`).join('&')
  const rqUrl = `${API_URL}?populate=*&${qs}`

  const response = await axios.get(rqUrl, { headers: { }}) 
  const { data } = response;
  return (data as StrapiResponse<Gems[]>).data;
}