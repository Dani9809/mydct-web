# Design Guidelines: "Make Your Dreams Come True" Dropshipping Store

## Design Approach
**Reference-Based**: Inspired by Printful's storefront and Shopify's Brooklyn theme - clean, modern e-commerce with emphasis on product photography and seamless shopping experience.

## Color Palette
- **Primary**: #FF6B6B (Coral Pink) - CTAs, links, primary actions
- **Secondary**: #4ECDC4 (Turquoise) - Secondary buttons, highlights
- **Background**: #FFFFFF (White) - Main background
- **Text**: #2C3E50 (Dark Blue-Grey) - Body text, headings
- **Accent**: #FFE66D (Warm Yellow) - Badges, notifications, highlights
- **Success**: #95E1D3 (Mint Green) - Success states, confirmations

## Typography
- **Headings**: Montserrat (Bold/Semi-Bold) - Clean, modern impact
- **Body**: Open Sans (Regular/Light) - Excellent readability
- **Hierarchy**: Hero (text-5xl/6xl), Product titles (text-2xl/3xl), Body (text-base/lg), Captions (text-sm)

## Layout System
**Spacing Units**: Tailwind spacing - 4, 8, 12, 16, 24, 32 for consistent rhythm
- Hero section: py-32 desktop, py-20 mobile
- Product grids: gap-8 desktop, gap-6 mobile
- Card padding: p-6
- Section spacing: py-24 desktop, py-16 mobile

## Component Library

### Hero Section
- Large full-width hero with lifestyle product photography
- Inspirational headline: "Make Your Dreams Come True"
- Supporting tagline about motivation and self-expression
- Prominent CTA button with blurred background overlay
- Height: 80vh minimum

### Product Grid
- Responsive grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Product cards with:
  - Product image (aspect-ratio square)
  - Product name
  - Price display
  - "View Product" button on hover
  - Smooth scale transform on hover (scale-105)

### Product Detail Page
- 2-column layout (image gallery left, details right) on desktop
- Image gallery with thumbnail navigation
- Size selector with radio buttons
- Add to Cart → "Buy on Printful" redirect button
- Product description with motivational messaging
- Related products carousel

### Navigation
- Sticky header with logo left, navigation center, cart icon right
- Categories: All Products, T-Shirts, Sweatshirts
- Mobile: Hamburger menu
- Background: white with subtle shadow on scroll

### Filter Section
- Horizontal filter bar above product grid
- Category pills with active state (coral pink background)
- Clean spacing between filters

### Footer
- 3-column layout: About, Quick Links, Social
- Newsletter signup with email input + subscribe button
- Copyright and Printful partnership mention

## Images
**Hero Image**: Lifestyle shot of person wearing "make your dreams come true" apparel in inspiring outdoor/urban setting, aspirational and energetic mood
**Product Images**: Clean white background studio shots showing t-shirts and sweatshirts with print design clearly visible
**Secondary Images**: Lifestyle shots of products being worn in authentic settings
**Image Treatment**: Sharp, vibrant, well-lit professional photography

## Interactions
- Smooth transitions (transition-all duration-300)
- Product card hover: subtle lift effect
- Button hover: slight darken (brightness-95)
- Filter active states: solid coral pink background
- Minimal, purposeful animations
- Scroll-based sticky navigation

## Responsive Behavior
- Mobile-first approach
- Product grid: 1 column mobile → 2 tablet → 3 desktop
- Hero text: centered on mobile, left-aligned desktop
- Navigation: hamburger mobile, full menu desktop
- Touch-friendly tap targets (min 44px height)