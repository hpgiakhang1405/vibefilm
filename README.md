# 🎬 VibeFilm - Modern Movie Streaming Application

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)

**VibeFilm** is a cutting-edge movie streaming platform built with the latest web technologies. It offers a seamless, responsive, and immersive viewing experience with a sleek dark-themed UI.

## ✨ Features

- **📽️ Extensive Library**: Access thousands of Movies, TV Series, Cartoons, and Variety Shows.
- **🔍 Smart Search**: Real-time search with debouncing for a smooth user experience.
- **🎞️ Advanced Player**: Custom video player featuring:
  - Multi-server support (VIP/Backup servers)
  - Episode navigation
  - Episode switching without full page reload
- **📱 Fully Responsive**: Optimized for all devices - Desktop, Tablet, and Mobile.
- **🎨 Modern UI/UX**:
  - Cinematic "Vibe" dark mode
  - Motion effects optimized for low-end devices
  - Interactive carousels (Embla Carousel)
- **⚡ High Performance**: Built on Next.js 16 App Router for lightning-fast navigation and SEO/SSR benefits.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Core**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management & UI**:
  - [ShadCN UI](https://ui.shadcn.com/) (Component Library)
  - [Framer Motion](https://www.framer.com/motion/) (Animations)
  - [Lucide React](https://lucide.dev/) (Icons)
  - [Radix UI](https://www.radix-ui.com/) (Headless UI primitives)
  - [Embla Carousel](https://www.embla-carousel.com/)
- **Utilities**:
  - Native `fetch` wrapper with cache/revalidate strategy
  - [Zod](https://zod.dev/) (Schema Validation)
  - [cn / clsx](https://github.com/lukeed/clsx) (Class merging)

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/vibefilm.git
    cd vibefilm
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup**:
    Create a `.env.local` file in the root directory and configure the following variables:

    ```env
    # API Configuration
    NEXT_PUBLIC_API_DOMAIN=https://your-api-domain.com
    NEXT_PUBLIC_APP_DOMAIN_CDN_IMAGE=https://your-cdn-domain.com
    NEXT_PUBLIC_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p

    # App URL (Optional, defaults to localhost:3000)
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

4.  **Run Development Server**:

    ```bash
    npm run dev
    ```

5.  **Open the App**:
    Visit [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
npm run dev    # Start development server
npm run lint   # Run ESLint
npm run build  # Build for production
npm run start  # Start production server
```

## 📂 Project Structure

This project adopts a **Feature-Based Architecture** for better scalability and code organization.

```bash
src/
├── app/                  # Next.js App Router (Pages, Layouts, Error Boundaries)
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   ├── phim/[slug]/      # Movie detail
│   ├── danh-sach/[slug]/ # List page by type
│   ├── the-loai/[slug]/  # List page by genre
│   ├── quoc-gia/[slug]/  # List page by country
│   └── tim-kiem/         # Search page
├── components/           # UI Components
│   ├── ui/               # Reusable atomic components (Buttons, Inputs)
│   ├── layout/           # Header, Footer, Sidebar
│   └── shared/           # Application-specific shared components
├── features/             # Feature Modules (Logic + Component composition)
│   ├── home/             # Homepage widgets & logic
│   ├── movies/           # Movie cards, details, lists
│   ├── search/           # Search bar & results logic
│   └── watch/            # Video player & episode list logic
├── hooks/                # Custom React Hooks
├── lib/                  # Utilities & Configurations
│   ├── axios.ts          # Shared fetch client + API constants
│   ├── constants.ts      # App-wide constants (Menus, Configs)
│   └── env.ts            # Environment variable validation (Zod)
├── providers/            # React Context Providers
└── types/                # TypeScript Type Definitions
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions or bug reports, please open an issue or submit a pull request.

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Developed by **[Antigravity](https://antigravity.google/)**.
