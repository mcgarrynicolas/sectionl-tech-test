export type Tag = {
  id: number,
  name: string
}


type PhotoFormat = {
  ext: string,
  url: string,
  name: string,
  size: number,
  width: number,
  height: number
}
export interface Gems {
  name: string,
  slug: string,
  shortDescription: string,
  longDescription: string,
  googleMapsUrl: string,
  coverImage: {
    name: string,
    url: string,
    alternativeText?: string,
    width: number,
    height: number, 
    formats?: {
      large: PhotoFormat,
      small: PhotoFormat,
      medium: PhotoFormat,
      thumbnail: PhotoFormat
    }
  }
  tags: Tag[],
  category: string
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