# Overview

This is a luxury personal portfolio website for Kiminou Knox, designed to showcase his multifaceted identity as an athlete, author, entrepreneur, and architect. The project combines luxury fashion aesthetics (inspired by Gucci), premium service presentation (inspired by Ascension Catamaran), and modern Webflow styling (inspired by EmSilk123) to create a sophisticated digital presence.

The website features an immersive experience with hero video backgrounds, elegant navigation with mega-menus, smooth scroll animations, lookbook galleries, press recognition strips, and comprehensive contact forms. The design emphasizes luxury through generous white space, crisp typography, high-quality imagery, and subtle hover effects.

# Recent Changes (November 17, 2025)

## Major Cleanup and Simplification

### Routing Structure
- Changed root path (`/`) to directly show Home page instead of Splash
- Added `/splash` route for optional splash screen access
- Added redirect from `/home` to `/` for canonical URL
- Added redirects from `/press-kit` and `/presskit` to `/contact`
- Added `/basketball` route aliasing to `/sports`

### Press Kit Removal
- Completely removed Press Kit page and all related components
- Removed all Press Kit links from Footer, Contact page, Press page, and navigation
- Redirected all Press Kit traffic to Contact page for unified media inquiries

### Contact Form Unification
- Created unified `ContactForm` component (`client/src/components/ContactForm.tsx`)
- Single reusable form with inquiry type selector (Speaking, Press/Media, Book, Basketball, Other)
- Conditional fields based on inquiry type (organization, date window, talk theme)
- Replaced separate contact forms on Contact and Speaking pages
- All contact forms now send emails to knoxkiminou1@gmail.com with inquiry type in subject line

### Footer Navigation Cleanup
- **Portfolio**: Reduced from 4 to 2 items (Athlete → /basketball, Author → /books)
- **Resources**: Reduced from 5 to 3 items (Poetry Books → /books, Speaking Engagements → /speaking, Athletic Achievements → /basketball)
- **Connect**: Updated Contact link from hash anchor to `/contact` route
- **Legal**: Reduced from 4 to 2 items (Speaking → /speaking, Contact → /contact)
- Removed all hash anchor navigation (#athlete, #author, etc.)
- Removed Fashion Brand and Youth Mentorship temporary placeholders
- All internal links now use `Link` component from wouter for proper routing

### Theme System Removal
- Removed all theme switching UI and controls (Palette button, theme menu)
- Removed `useTheme` hook entirely
- Hard-coded site to single "Maison" theme
- Updated Header component to no longer accept theme props
- Removed theme props from all page components (Home, Books, Sports, Contact, Speaking, etc.)

### Email Integration
- Updated contact form schema to include `inquiryType` enum
- Server-side email formatting includes inquiry type in subject line
- All optional fields (organization, dateWindow, talkTheme) properly captured and displayed in emails

# Recent Changes (November 1, 2025)

## Navigation Restructuring
- Updated Header navigation to include Books, Basketball, Speaking, Brand (external link to thett.shop), and Contact
- Removed duplicate navigation items and consolidated menu structure
- Brand link opens in new tab to external store

## Homepage Optimizations
- Simplified Stats section from 6 metrics to 4 verified metrics (Published Books, Major Awards, Height/Weight, Class Year)
- Removed SAT score, Honor Roll, and Age from stats display to keep only stable, recruit-ready information
- Added Poem of the Day feature with daily rotation from 7-poem library
- Content follows strict no-hyphen/no-em-dash policy via CSS
- Removed Milestones section to eliminate repetitive content
- Reduced spacing between sections for tighter, more streamlined layout
- Replaced generic "Latest Releases" section with dedicated Featured Book Promo highlighting "The Adventures of Kiminou the Great and Chua the Wise"

## Books Library
- Added 2 missing books to books.json: Boys Raised in Silence and The Adventures of Kiminou the Great and Chua the Wise
- Now featuring all 6 published works with complete details, sample poems, and purchase links
- Books page updated with proper SEO metadata and consistent Header/Footer structure

## Page Consistency
- Updated Books, Sports, and Speaking pages with unified theming using useTheme hook
- Added SEO meta tags (title, description, Open Graph) to all dedicated pages
- Integrated Header and Footer components across all pages for consistent navigation

## Poem of the Day Feature
- Created PoemOfTheDay.tsx component with deterministic daily rotation based on day-of-year
- Poem library stored in client/public/poems.json with 7 poems
- Integrated into homepage with scroll animations
- Fetches from static JSON, rotates automatically each calendar day

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom design system and CSS variables for theming
- **Component Library**: Radix UI primitives with shadcn/ui components for accessible, customizable UI elements
- **Icons**: Lucide React for consistent iconography
- **Animations**: Framer Motion for smooth transitions and scroll-triggered animations
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state and React hooks for local state

## Design System
- **Typography**: Cormorant Garamond (serif) for headings and Inter (sans-serif) for body text
- **Theming**: Single "Maison" theme with consistent CSS custom properties (theme switching removed for simplicity)
- **Layout**: Mobile-first responsive design with max-width containers and grid systems
- **Color Palette**: Neutral base with luxury-focused contrast ratios and accessibility compliance

## Component Architecture
- **Modular Structure**: Reusable components organized by feature (Header, Hero, ContactForm, Section, etc.)
- **Composition Pattern**: Flexible component composition using slots and forwarded refs
- **Custom Hooks**: Scroll animations and responsive behavior
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Unified Forms**: Single ContactForm component reused across Contact and Speaking pages with configurable defaults

## Backend Architecture
- **Server**: Express.js with TypeScript for API endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions
- **Development**: Hot module replacement with Vite integration

## Data Layer
- **Schema**: Drizzle schema definitions in shared directory for type consistency
- **Validation**: Zod schemas for runtime type validation
- **Migrations**: Drizzle-kit for database schema management
- **Storage Interface**: Abstracted storage layer supporting both memory and PostgreSQL implementations

## Performance Optimizations
- **Code Splitting**: Vite's automatic code splitting for optimal bundle sizes
- **Image Optimization**: Lazy loading and responsive images with proper alt text
- **Animation Performance**: CSS transforms and GPU acceleration for smooth animations
- **Caching**: Query caching with TanStack Query for reduced API calls

# External Dependencies

## Database & ORM
- **Neon Database**: Serverless PostgreSQL database with edge compatibility
- **Drizzle ORM**: Type-safe database toolkit with migration support
- **Drizzle-kit**: CLI tools for schema management and migrations

## UI & Styling
- **Radix UI**: Headless component primitives for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Class Variance Authority**: Type-safe component variants
- **Lucide React**: Feather-inspired icon library

## Animation & Interaction
- **Framer Motion**: Production-ready motion library for React
- **Embla Carousel**: Lightweight carousel with touch support
- **Intersection Observer API**: Native scroll-triggered animations

## Development Tools
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment with cartographer and error overlay plugins

## Forms & Validation
- **React Hook Form**: Performant forms with minimal re-renders
- **Hookform Resolvers**: Validation resolver for Zod schemas
- **Zod**: Runtime type validation and schema definition

## Utilities
- **Date-fns**: Modern date utility library
- **clsx & twMerge**: Conditional className utilities
- **Nanoid**: URL-safe unique string generator