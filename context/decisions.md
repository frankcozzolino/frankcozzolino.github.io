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

## Mobile Image Click Expansion Fix (2025-01-12)
**Decision**: Replace dramatic 150vh full-screen expansion with subtle 15% scaling + visible overlay
**Problem**: Mobile image click triggered `height: 150vh !important` causing full viewport takeover instead of gentle interaction
**Solution Approach**:
- **Expansion Method**: Changed from height manipulation to `transform: scale(1.15)` for subtle 15% growth
- **Image Scaling**: Modified from `scale(0.8)` (shrinking) to `scale(1.05)` (slight enlargement) 
- **Overlay Visibility**: Added `opacity: 1 !important` with optimized gradient for clear title/description display
- **Text Optimization**: Reduced h2 from 1.6rem to 1.4rem, label from 1rem to 0.9rem for better proportions
- **Animation**: Maintained smooth 0.6s cubic-bezier transition for professional feel
**Rationale**: 
- User requested "little bit expansion" not full-screen takeover
- Subtle scaling provides gentle feedback without overwhelming the interface
- Transform-based scaling is more performant than height changes
- Enhanced overlay ensures title/description visibility as requested
**Result**: Mobile clicks now show gentle 15% section expansion with prominently visible content overlay
**Files Modified**: `css/style.css` - Mobile expansion classes (.mobile-expanded, .mobile-expanded-*, .mobile-expanded .section-bg, .mobile-expanded .content-overlay)

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

## Social Media Icons: Font Awesome → Official Brand SVGs (CRITICAL REVISION)
**Original Decision**: Font Awesome CDN for social media icons
**Issue Identified**: User correctly noted Font Awesome icons ≠ official brand icons
**Revised Decision**: Official SVG icons directly from each brand's design guidelines
**Technical Change**:
- **Removed**: Font Awesome CDN dependency (`link` tag in HTML)
- **Added**: Inline SVG icons with official brand paths
- **CSS Update**: Changed from `.fa-icon { color: brand-color }` to `[title="Brand"] svg { fill: brand-color }`
**Brands Implemented**: WhatsApp, Discord, LinkedIn, Instagram, Gmail, GitHub
**Key Learning**: 
- Icon libraries provide interpretations, not official designs
- Users distinguish authentic brand icons from library versions
- Professional sites require official brand assets for credibility
- SVG implementation offers better control and authenticity
**Result**: Authentic brand representation matching each company's official design 