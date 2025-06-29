# Technical Decisions

## Design Approach
- **Single-page layout**: Hero + 3 diagonal sections (sailing, professional, hobbies)
- **Diagonal sections**: Using CSS clip-path for modern slanted edges
- **Color scheme**: Ocean blues (#005884, #004a7c, #006494) for nautical theme
- **Typography**: Roboto Condensed for professional nautical aesthetic

## Layout Strategy
- **Grid system**: CSS Grid for 2-column and 3-column layouts
- **Responsive**: Mobile-first approach with breakpoint at 768px
- **Hero section**: Full viewport height with absolute positioning
- **Navigation**: Smooth scroll to sections via anchor links

## Interactive Features
- **Carousel**: Hero image slider (implementation pending)
- **Maps**: Interactive sailing routes/locations
- **Charts**: Radar chart for sailing skills visualization
- **PDF**: Direct download link for resume

## Dependencies
- Chart.js for radar chart
- Map service (Mapbox or Google Maps)
- Optional: Siema or Swiper for carousel

## File Organization
- Separate CSS file for maintainability
- Images folder for all visual assets
- Docs folder for downloadable files
- Clean semantic HTML structure 

# Technical Decisions & Rationale

## Image Styling Update (2025-01-12)
**Decision**: Convert all background images to black and white with increased brightness
**Approach**: 
- Used CSS filters: `grayscale(100%) contrast(200%) brightness(1.5)`
- Maintained B&W aesthetic on hover with higher brightness: `brightness(1.8)`
**Rationale**: 
- User requested B&W conversion with more light due to images being too dark
- Preserved hover interactions while maintaining consistent aesthetic
- Applied uniformly across all sections (sailing, coding, PM, hobbies)
**Files Modified**: `css/style.css` - `.section-bg` and `.diagonal-section:hover .section-bg` rules 