import axios from "axios";
import type { StrapiResponse, Gems } from "../types/api";
import qs from "qs";

const API_URL = `https://content.section-l.co/api/city-gems`;
type ApiPaginationOptions = {
  pageSize: number,
  page: number,
};
export async function getCityGemsInNeighborhoods(neighborhoods: number[], paginationOptions: ApiPaginationOptions = { pageSize: 50, page: 1 }): Promise<StrapiResponse<Gems[]>> {
  const neighborhoodsQueryString = neighborhoods.map((nb) => `filters[neighborhoods][id][$eq]=${nb}`).join('&');
  const paginationQueryString = qs.stringify({ pagination: paginationOptions });
  const rqUrl = `${API_URL}?populate=*&${neighborhoodsQueryString}&${paginationQueryString}`;

  const response = await axios.get(rqUrl, { headers: {} });
  return response.data;
}

const STRAPI_MAX_PAGE_SIZE = 100;

export async function getAllCityGemsInNeighborhoods(neighborhoods: number[]) {
  const { data, meta } = await getCityGemsInNeighborhoods(neighborhoods);
  const { pagination } = meta;
  if (pagination.pageCount > 1 && pagination.total < STRAPI_MAX_PAGE_SIZE) {
    const { data } = await getCityGemsInNeighborhoods(neighborhoods, { page: 1, pageSize: pagination.total });
    return data;
  } else if (pagination.pageCount > 1) {
    const pageSize = STRAPI_MAX_PAGE_SIZE; // max page size for strapi request
    const requests = Array
      .from(
        { length: Math.ceil(pagination.total / pageSize) }, (_, i) => i
      )
      .map(
        (pageNum) => getCityGemsInNeighborhoods(neighborhoods, { page: pageNum + 1, pageSize })
      );
    const allGemsData = await Promise.all(requests);
    const allGems = allGemsData.reduce((prev, curr) => {
      const { data } = curr;
      return [...prev, ...data];
    }, [] as Gems[]);
    return allGems;
  }
  return data;
}