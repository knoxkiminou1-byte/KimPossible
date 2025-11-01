# Kiminou Knox - Luxury Personal Portfolio Design Guidelines

## Design Approach
**Reference-Based Strategy**: Inspired by Apple's minimalist luxury, Nike's athletic premium aesthetic, and high-end creative portfolios (Behance Pro, fashion portfolios). Focus on spacious layouts, dramatic imagery, and sophisticated restraint that communicates prestige and intentionality.

## Core Design Elements

### Typography System
**Primary Font:** "Syne" (Google Fonts) - Modern, distinctive for headlines
**Secondary Font:** "Inter" (Google Fonts) - Clean, professional for body text

**Hierarchy:**
- Hero Headlines: Syne, 4xl to 6xl (responsive), font-weight 700, tracking tight (-0.02em)
- Section Headlines: Syne, 3xl to 5xl, font-weight 600
- Subheadings: Syne, xl to 2xl, font-weight 500
- Body Text: Inter, base to lg, font-weight 400, leading relaxed (1.6)
- Captions/Labels: Inter, sm, font-weight 500, uppercase, tracking wide (0.1em)
- Navigation: Inter, sm to base, font-weight 500

### Layout System
**Spacing Primitives:** Tailwind units of 4, 8, 12, 16, 20, 24, 32 (p-4, m-8, gap-12, py-16, etc.)

**Container Strategy:**
- Full-width sections with inner max-w-7xl containers
- Content max-width: max-w-6xl for text-heavy sections
- Asymmetric layouts for visual interest (60/40 splits, staggered grids)

**Grid Philosophy:**
- Desktop: 12-column system with 6-8 unit gaps
- Tablet: 8-column system
- Mobile: Single column, full-width cards

### Component Library

**Navigation:**
Fixed header with backdrop blur, minimal height (h-20), logo left, navigation center, CTA right. Include discrete indicators for current page.

**Hero Sections (All Pages):**
Full-viewport height (min-h-screen), large-format photography showcasing Kiminou in context (court action, speaking engagement, book cover shoot). Overlay gradient (subtle, bottom-to-top) for text legibility. Title, subtitle, dual-CTA layout with blurred-background buttons (backdrop-blur-md, semi-transparent background). Hero image should be professionally shot, high-resolution, establishing immediate prestige.

**Cards - Achievement Showcases:**
Large format cards (min-h-96) with hover-lift effect (subtle translateY). Image-dominant with minimal overlay text. Asymmetric layouts - avoid identical card sizes.

**Stats Display:**
Large numerals (6xl to 8xl font size) with small descriptive labels below. Presented in horizontal rows with generous spacing (gap-16 to gap-24).

**Testimonials:**
Single large-format quote per viewport, professional headshot (circular, 20-24 size), name/title in small caps below. Carousel navigation with minimal dot indicators.

**Content Grids:**
Masonry-style layouts for Books (book covers), Basketball highlights (action shots), Media appearances (event photos). Varied image aspect ratios, 2-3 columns on desktop, single column mobile.

**Footer:**
Expansive (py-20), three-column layout: Logo/tagline, Quick links, Social/Contact. Newsletter signup integrated as subtle single-line input with inline button.

### Page-Specific Layouts

**Homepage:**
- Full-screen hero with Kiminou's portrait/action shot
- Four-card section: Books, Basketball, Speaker, Brand (each card links to dedicated page, uses striking imagery)
- Achievement stats row (books published, teams played, speaking engagements, followers)
- Featured media/press section (logos of publications/organizations)
- Single testimonial highlight
- Contact CTA section

**Books Page:**
- Hero: Kiminou with books or writing/reading scene
- Book showcase grid (covers as primary visuals, 2-3 columns)
- Each book: cover image, title, brief description, purchase/learn more CTAs
- Author philosophy section (large quote treatment)
- Press/reviews section

**Basketball Page:**
- Hero: Action shot on court
- Career timeline (vertical on mobile, horizontal on desktop with connecting line)
- Highlight reel grid (action photography, 3-column masonry)
- Stats showcase (large numerals with icons)
- Team/achievements section with logos

**Speaker & Media Page:**
- Hero: Speaking engagement or professional headshot
- Speaking topics grid (icon + title + description cards)
- Past engagements gallery (event photos in varied sizes)
- Video embed section for featured talks
- Booking inquiry form (elegant, minimal fields)

**Brand Page:**
- Hero: Lifestyle/personal brand shot
- Brand pillars (3-column: values, mission, vision with supporting imagery)
- Collaborations/partnerships section (logo grid)
- Social media feed integration (Instagram-style grid)
- Press kit download CTA

### Animations
**Minimal Motion Philosophy:**
- Scroll-triggered fade-ins (opacity 0 to 1, translateY 20px to 0, duration 0.6s)
- Card hover lifts (translateY -4px, duration 0.3s)
- Navigation backdrop blur on scroll
- NO page transitions, parallax, or continuous animations

### Images
**Primary Photography Style:** Professional, high-contrast, dramatic lighting. Mix of portrait orientation (hero sections) and landscape (content grids).

**Specific Image Placements:**
- Homepage Hero: Full-screen portrait of Kiminou (professional, confident pose)
- Books Hero: Kiminou reading/writing in upscale environment
- Basketball Hero: Dynamic action shot mid-game
- Speaker Hero: Stage presence shot or professional speaking portrait
- Brand Hero: Lifestyle shot showcasing personal style
- Content Grids: Book covers, basketball action sequences, speaking engagement photos, lifestyle/brand imagery

All heroes require large format (1920x1080 minimum), professionally shot, well-lit imagery that immediately communicates luxury and professionalism.