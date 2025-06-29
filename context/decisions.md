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
**Decision**: Implement pure grayscale default with full color + custom gradient overlay on hover
**Approach**: 
- **Default**: `grayscale(100%) contrast(105%) brightness(1.1)` - Pure grayscale with slight enhancement
- **Hover**: `filter: brightness(1.05)` - Full original colors with subtle brightness boost
- **Gradient Overlay**: #2B5C95 top-to-bottom gradient replacing dark overlay on hover
**Rationale**: 
- User requested pure grayscale (not blue-tinted) with full color revelation on hover
- Custom #2B5C95 gradient overlay adds branded nautical aesthetic
- Classic interaction pattern: muted default → vibrant hover with branded overlay
- Maintains professional appearance while providing engaging interaction
**Technical Implementation**:
- `grayscale(100%)`: Complete desaturation for clean default state
- `contrast(105%)`: Subtle definition enhancement
- Pseudo-element gradient transition for smooth branded overlay effect
- 0.4s animated transitions for professional feel
**Files Modified**: `css/style.css` - `.section-bg`, `.diagonal-section:hover .section-bg`, and `.section-bg::before` rules 