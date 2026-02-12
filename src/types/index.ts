// API Response Types
export interface Pagination {
  totalItems: number
  totalItemsPerPage: number
  currentPage: number
  pageRanges: number
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Country {
  id: string
  name: string
  slug: string
}

export interface Movie {
  _id: string
  name: string
  origin_name: string
  slug: string
  type: string
  thumb_url: string
  poster_url: string
  year: number
  time?: string
  quality?: string
  lang?: string
  episode_current?: string
  category: Category[]
  country: Country[]
  tmdb?: {
    type: string
    id: string
    vote_average: number
    vote_count: number
  }
  imdb?: {
    id: string
    vote_average: number
    vote_count: number
  }
}

export interface EpisodeServerData {
  name: string
  slug: string
  filename: string
  link_embed: string
  link_m3u8: string
}

export type Episode = EpisodeServerData
export type ServerData = EpisodeServerData

export interface EpisodeServer {
  server_name: string
  server_data: EpisodeServerData[]
}

export interface MovieDetail extends Movie {
  content: string
  status: string
  is_copyright: boolean
  sub_docquyen: boolean
  chieurap: boolean
  trailer_url: string
  episode_total: string
  notify: string
  showtimes: string
  view: number
  actor: string[]
  director: string[]
  episodes: EpisodeServer[]
}

export interface ListResponse {
  status: boolean | string
  msg: string
  data: {
    seoOnPage: {
      og_type: string
      titleHead: string
      descriptionHead: string
      og_image: string[]
      updated_time: number
      og_url: string
    }
    breadCrumb: {
      name: string
      slug?: string
      position: number
      isCurrent?: boolean
    }[]
    titlePage: string
    items: Movie[]
    params: {
      type_slug: string
      filterCategory: string[]
      filterCountry: string[]
      filterYear: string
      filterType: string
      sortField: string
      sortType: string
      pagination: Pagination
    }
    type_list: string
    APP_DOMAIN_FRONTEND: string
    APP_DOMAIN_CDN_IMAGE: string
  }
}

export interface MovieDetailResponse {
  status: boolean | string
  msg: string
  data: {
    seoOnPage: {
      og_type: string
      titleHead: string
      descriptionHead: string
      og_image: string[]
      updated_time: number
      og_url: string
    }
    breadCrumb: {
      name: string
      slug?: string
      position: number
      isCurrent?: boolean
    }[]
    titlePage: string
    item: MovieDetail
    params: {
      slug: string
    }
    type_list: string
    APP_DOMAIN_FRONTEND: string
    APP_DOMAIN_CDN_IMAGE: string
  }
}

// Actor/People types
export interface Actor {
  tmdb_people_id: number
  adult: boolean
  gender: number
  gender_name: string
  name: string
  original_name: string
  character: string
  known_for_department: string
  profile_path: string
}

export interface PeoplesResponse {
  success: boolean
  message: string
  data: {
    tmdb_id: number
    tmdb_type: string
    ophim_id: string
    slug: string
    imdb_id: string
    profile_sizes: {
      h632: string
      original: string
      w185: string
      w45: string
    }
    peoples: Actor[]
  }
}

// Genre and Country types
export interface Genre {
  _id: string
  name: string
  slug: string
}

export interface CountryList {
  _id: string
  name: string
  slug: string
}

export interface CategoryListResponse<T> {
  status: string
  message: string
  data: {
    items: T[]
  }
}

// Keywords types
export interface Keyword {
  tmdb_keyword_id: number
  name: string
  name_vn: string
}

export interface KeywordsResponse {
  success: boolean
  message: string
  data: {
    tmdb_id: number
    tmdb_type: string
    ophim_id: string
    slug: string
    imdb_id: string
    keywords: Keyword[]
  }
}

// Movie Images types
export interface MovieImage {
  width: number
  height: number
  aspect_ratio: number
  type: 'backdrop' | 'poster'
  file_path: string
}

export interface ImagesResponse {
  success: boolean
  message: string
  data: {
    tmdb_id: number
    tmdb_type: string
    ophim_id: string
    slug: string
    imdb_id: string
    image_sizes: {
      backdrop: Record<string, string>
      poster: Record<string, string>
    }
    images: MovieImage[]
  }
}
