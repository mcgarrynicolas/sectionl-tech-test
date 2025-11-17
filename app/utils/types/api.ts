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
  id: number
}


export type Property = {
  name: string,
  id: number,
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