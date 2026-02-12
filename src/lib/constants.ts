// Navigation list items - used in Header
export const NAV_LIST_ITEMS = [
  { name: 'Phim Mới', slug: 'phim-moi' },
  { name: 'Phim Bộ', slug: 'phim-bo' },
  { name: 'Phim Lẻ', slug: 'phim-le' },
  { name: 'TV Shows', slug: 'tv-shows' },
  { name: 'Hoạt Hình', slug: 'hoat-hinh' },
  { name: 'Phim Vietsub', slug: 'phim-vietsub' },
  { name: 'Phim Thuyết Minh', slug: 'phim-thuyet-minh' },
  { name: 'Phim Lồng Tiếng', slug: 'phim-long-tieng' },
  { name: 'Phim Bộ Đang Chiếu', slug: 'phim-bo-dang-chieu' },
  { name: 'Phim Bộ Hoàn Thành', slug: 'phim-bo-hoan-thanh' },
  { name: 'Phim Sắp Chiếu', slug: 'phim-sap-chieu' },
  { name: 'Subteam', slug: 'subteam' },
  { name: 'Phim Chiếu Rạp', slug: 'phim-chieu-rap' }
] as const

export type NavListItem = (typeof NAV_LIST_ITEMS)[number]

// Video player constants
export const VIDEO_PLAYER = {
  CONTROLS_TIMEOUT: 3000,
  SKIP_SECONDS: 10,
  DEFAULT_VOLUME: 1,
  DEFAULT_BRIGHTNESS: 100
} as const

// Pagination constants
export const PAGINATION = {
  ITEMS_PER_PAGE: 24,
  MAX_VISIBLE_PAGES: 5
} as const

// Image quality presets
export const IMAGE_QUALITY = {
  THUMBNAIL: 60,
  CARD: 75,
  DETAIL: 90,
  HERO: 85
} as const

// Cache durations (in seconds)
export const CACHE_DURATION = {
  STATIC: 3600 * 24, // 24 hours
  DYNAMIC: 3600, // 1 hour
  API_REVALIDATE: 60 // 1 minute
} as const

export const CACHE_TAGS = {
  HOME: 'home',
  LIST: 'list',
  GENRE: 'genre',
  COUNTRY: 'country',
  MOVIE: 'movie',
  MOVIE_PEOPLES: 'movie:peoples',
  MOVIE_KEYWORDS: 'movie:keywords',
  MOVIE_IMAGES: 'movie:images',
  SEARCH: 'search'
} as const

// UI Text Constants
export const UI_TEXT = {
  WATCH_NOW: 'Xem ngay',
  MORE_INFO: 'Thông tin khác',
  SEARCH_PLACEHOLDER: 'Tìm kiếm phim...',
  NO_RESULTS: 'Không tìm thấy phim nào',
  TRY_ANOTHER_KEYWORD: 'Thử từ khóa khác nhé',
  VIEW_ALL_RESULTS: 'Xem tất cả kết quả cho',
  MOVIE_NEW: 'PHIM MỚI',
  MOVIE_UPDATING: 'Đang cập nhật phim...',
  WATCH_TRAILER: 'Xem Trailer',
  NA: 'N/A',
  CHOOSE_SERVER: 'Chọn Server',
  EPISODE_LIST: 'Danh sách tập',
  EPISODE: 'tập',
  COPYRIGHT: '© 2026 VibeFilm. Dữ liệu từ',
  MADE_BY: 'Made by',
  ABOUT_TITLE: 'VibeFilm - Nền tảng giải trí trực tuyến chất lượng cao',
  ABOUT_DESC:
    'Thưởng thức hàng ngàn bộ phim đặc sắc với chất lượng hình ảnh sắc nét, cập nhật nhanh chóng và trải nghiệm mượt mà ngay tại nhà.',
  CATEGORY: 'Danh Mục',
  GENRE: 'Thể Loại',
  COUNTRY: 'Quốc Gia'
} as const

// Badge Text Constants
export const BADGE_TEXT = {
  HD: 'HD',
  FULL: 'Full',
  SUBTITLE: 'Phụ đề',
  EPISODE: 'Tập'
} as const

// Timing Constants (ms)
export const TIMING = {
  DEBOUNCE_SEARCH: 600,
  CAROUSEL_AUTOPLAY: 5000,
  CAROUSEL_TRANSITION: 20
} as const

// API Endpoints
export const API_ENDPOINTS = {
  HOME: '/v1/api/home',
  LIST: '/v1/api/danh-sach',
  GENRE: '/v1/api/the-loai',
  COUNTRY: '/v1/api/quoc-gia',
  MOVIE_DETAIL: '/v1/api/phim',
  SEARCH: '/v1/api/tim-kiem',
  PEOPLES: '/peoples', // Suffix
  KEYWORDS: '/keywords', // Suffix
  IMAGES: '/images' // Suffix
} as const

// App Routes
export const APP_ROUTES = {
  HOME: '/',
  LIST: '/danh-sach',
  GENRE: '/the-loai',
  COUNTRY: '/quoc-gia',
  MOVIE: '/phim',
  SEARCH: '/tim-kiem'
} as const

// Movie Types (Slugs)
export const MOVIE_TYPES = {
  PHIM_MOI: 'phim-moi',
  PHIM_BO: 'phim-bo',
  PHIM_LE: 'phim-le',
  TV_SHOWS: 'tv-shows',
  HOAT_HINH: 'hoat-hinh',
  PHIM_VIETSUB: 'phim-vietsub',
  PHIM_THUYET_MINH: 'phim-thuyet-minh',
  PHIM_LONG_TIENG: 'phim-long-tieng',
  PHIM_BO_DANG_CHIEU: 'phim-bo-dang-chieu',
  PHIM_BO_HOAN_THANH: 'phim-bo-hoan-thanh',
  PHIM_SAP_CHIEU: 'phim-sap-chieu',
  SUBTEAM: 'subteam',
  PHIM_CHIEU_RAP: 'phim-chieu-rap'
} as const

export const ERROR_ICON_CLASS =
  'w-20 h-20 md:w-24 md:h-24 text-primary/80 drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]'

// DOM Element IDs
export const DOM_IDS = {
  VIDEO_PLAYER_SECTION: 'video-player-section',
  MOVIE_SECTION_BASE: 'movie-section', // Prefix for dynamic sections
  HEADER: 'header' // Ensure header has this ID or class
} as const

// Scroll Configuration
export const SCROLL_OFFSETS = {
  VIDEO_PLAYER: -100,
  SECTION_HEADER_OFFSET: 20
} as const

// External Links
export const EXTERNAL_LINKS = {
  OPHIM: 'https://ophim17.cc/',
  AUTHOR: 'https://antigravity.google/'
} as const

// Skeleton Configuration
export const SKELETON_COUNTS = {
  GRID: 18,
  CAROUSEL: 5,
  EPISODE_LIST: 10
} as const
