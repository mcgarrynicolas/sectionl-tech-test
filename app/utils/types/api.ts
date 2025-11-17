export type Tag = {
  id: number,
  name: string
}

export type Gems = {
  name: string,
  slug: string,
  shortDescription: string,
  longDescription: string,
  googleMapsUrl: string,
  tags: Tag[]
}


export type Neighborhood = {
  name: string,
  slug: string,
  city_gems: Gems[]
}


export type Property = {
  name: string,
  slug: string,
  neighborhoods: Neighborhood[]
}

export interface StrapiResponse<T> {
  data: T,
  meta: {
    pagination: {
      page: number,
      pageSize: number,
      pageCount: number,
      total: number
    }
  }
}