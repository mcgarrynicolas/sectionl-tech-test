import axios from "axios";
import type { StrapiResponse, Property } from "../types/api";

const API_URL = `/api/properties?populate=*`;
async function getPropertiesFromApi(): Promise<StrapiResponse<Property[]>> {
  const response = await axios.get(API_URL, { baseURL: import.meta.env.DEV ? "" : "https://content.section-l.co" });
  return response.data;
}

export async function getPropertyData(): Promise<Property[]> {
  const properties = await getPropertiesFromApi();
  return properties.data;
}