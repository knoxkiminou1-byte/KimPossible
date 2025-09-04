# Overview

This is a luxury personal portfolio website for Kiminou Knox, designed to showcase his multifaceted identity as an athlete, author, entrepreneur, and architect. The project combines luxury fashion aesthetics (inspired by Gucci), premium service presentation (inspired by Ascension Catamaran), and modern Webflow styling (inspired by EmSilk123) to create a sophisticated digital presence.

The website features an immersive experience with hero video backgrounds, elegant navigation with mega-menus, smooth scroll animations, lookbook galleries, press recognition strips, and comprehensive contact forms. The design emphasizes luxury through generous white space, crisp typography, high-quality imagery, and subtle hover effects.

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
- **Theming**: Multi-theme support (Maison, Noir, Editorial, Street) using CSS custom properties
- **Layout**: Mobile-first responsive design with max-width containers and grid systems
- **Color Palette**: Neutral base with luxury-focused contrast ratios and accessibility compliance

## Component Architecture
- **Modular Structure**: Reusable components organized by feature (Header, Hero, Doors, Section, etc.)
- **Composition Pattern**: Flexible component composition using slots and forwarded refs
- **Custom Hooks**: Scroll animations, theme management, and responsive behavior
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

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