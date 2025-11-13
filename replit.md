# Dream Apparel - Motivational Dropshipping Store

## Overview

Dream Apparel is a motivational apparel e-commerce storefront built as a dropshipping platform integrated with Printful. The application showcases inspirational clothing items (t-shirts, sweatshirts, hoodies) with "make your dreams come true" themed designs. Users browse products by category, view detailed product information, and are redirected to Printful for purchase completion. The design emphasizes clean, modern aesthetics inspired by Printful's storefront and Shopify's Brooklyn theme, with a vibrant color palette (coral pink, turquoise, warm yellow) that reinforces the motivational brand identity.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server

**Routing**: Wouter for lightweight client-side routing
- Home page (`/`) - Hero section with product grid and category filtering
- Product detail page (`/product/:id`) - Individual product view with size selection and Printful redirect
- 404 page for unmatched routes

**State Management**: 
- TanStack Query (React Query) for server state management and API data fetching
- Local React state for UI interactions (category filters, size selection, mobile menu)
- No global state management library - component-level state suffices for this application's scope

**Component Library**: Shadcn/ui (Radix UI primitives) with custom Tailwind configuration
- Design system based on "new-york" style variant
- Custom color palette defined in CSS variables for light mode
- Typography: Montserrat for headings, Open Sans for body text
- Spacing system using Tailwind's standard units (4, 8, 12, 16, 24, 32)

**Styling Approach**:
- Tailwind CSS for utility-first styling
- Custom CSS variables for theming (defined in `client/src/index.css`)
- Responsive design with mobile-first breakpoints (md:768px, lg:1024px)
- Hover effects using custom elevation classes (`hover-elevate`, `active-elevate-2`)

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js

**API Design**: RESTful endpoints serving JSON responses
- `GET /api/products` - Fetch all products or filter by category query parameter
- `GET /api/products/:id` - Fetch single product by ID

**Data Layer**: In-memory storage (MemStorage class) implementing IStorage interface
- Products are initialized on server startup with hardcoded catalog
- No persistence layer - data resets on server restart
- Database schema defined using Drizzle ORM with PostgreSQL dialect, but currently unused
- Schema includes `users` and `products` tables with proper typing via Drizzle-Zod integration

**Middleware Stack**:
- JSON body parsing with raw body verification support
- URL-encoded form data support
- Request logging middleware tracking method, path, status, duration, and response preview
- Vite dev server middleware in development mode
- Static file serving in production

**Development Server**: Vite middleware mode integrates with Express
- HMR (Hot Module Replacement) enabled for rapid development
- SSR template handling for React application bootstrap
- Development-only Replit plugins (cartographer, dev banner, runtime error overlay)

### Data Storage Solutions

**Current Implementation**: In-memory storage with TypeScript interfaces
- `IStorage` interface defines contract for data access methods
- `MemStorage` class implements interface with Map-based storage
- Products initialized with mock data matching the Printful catalog theme

**Planned/Configured**: PostgreSQL via Neon Database
- Drizzle ORM configured for PostgreSQL dialect
- Connection via `@neondatabase/serverless` package
- Migration directory: `./migrations`
- Schema file: `./shared/schema.ts`
- Database push command available: `npm run db:push`

**Schema Design**:
- `users` table: id (UUID primary key), username (unique), password
- `products` table: id (UUID primary key), name, category, price (decimal), description, image, printfulUrl, sizes (text array)
- Both tables use `gen_random_uuid()` for automatic ID generation
- Zod schemas generated via `drizzle-zod` for runtime validation

### External Dependencies

**Printful Integration**:
- Dropshipping fulfillment partner - products redirect to Printful URLs for purchase
- Each product stores `printfulUrl` pointing to Printful's custom product pages
- No direct API integration - users are redirected to complete transactions on Printful's platform

**UI Component Libraries**:
- Radix UI primitives (@radix-ui/*) for accessible, unstyled components
- Shadcn/ui component patterns with custom styling
- Lucide React for iconography (Menu, X, ShoppingCart, ArrowLeft, ExternalLink, etc.)
- Embla Carousel for product image galleries

**Asset Management**:
- Product images stored in `/attached_assets/generated_images/` directory
- Images referenced via Vite aliases (`@assets` path)
- Hero image and product photos use AI-generated or placeholder imagery

**Build & Development Tools**:
- Vite for frontend bundling and dev server
- esbuild for backend TypeScript compilation in production builds
- TSX for running TypeScript in development
- PostCSS with Tailwind and Autoprefixer

**Type Safety**:
- Shared TypeScript types between client and server via `@shared` path alias
- Drizzle-Zod for database schema validation
- React Hook Form with Zod resolvers for form validation (hookform/resolvers)

**Production Considerations**:
- Database URL required via `DATABASE_URL` environment variable
- Separate build processes for client (Vite) and server (esbuild)
- Static file serving from `dist/public` in production
- Node environment detection via `NODE_ENV`