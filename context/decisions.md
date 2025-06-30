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

## Mobile Section Expansion Enhancement (2025-01-12)
**Decision**: Increase mobile click expansion scale from 15% to 25% for more prominent visual feedback
**Problem**: User requested "when i click i want the section to expand a bit more" - current 15% expansion was too subtle
**Root Cause**: Scale value of 1.15 provided insufficient visual feedback for mobile touch interaction
**Solution Approach**:
- **Expansion Scale**: Changed from `transform: scale(1.15)` to `transform: scale(1.25)` (15% → 25% increase)
- **Maintained Animation**: Kept smooth 0.6s cubic-bezier transition for professional feel
- **Touch Feedback**: More noticeable section growth provides better user interaction confirmation
**Rationale**:
- Mobile users need clear visual feedback to confirm their touch interaction
- 15% expansion was too subtle to provide satisfying interaction feedback
- 25% expansion provides better balance between noticeable growth and maintaining layout integrity
- Smooth animation ensures the expansion feels natural and professional
**Result**: Mobile sections now expand by 25% when clicked, providing more satisfying visual feedback
**Files Modified**: `css/style.css` - Mobile expansion scale value

## Mobile Title Click Visibility Fix (2025-01-12)
**Decision**: Hide titles by default, show ONLY when sections are clicked on mobile
**Problem**: User clarified "the title is not visible at all it was not an issue of transparency, there is no title. and i dont want title when the section is not clicked"
**Root Cause**: Previous fix incorrectly added base overlay visibility, but user wants clean sections by default with titles appearing only on click
**Solution Approach**:
- **Hide Default**: Set `.content-overlay { opacity: 0 !important; }` for mobile base state
- **Click-Only Display**: Enhanced `.mobile-expanded .content-overlay` with strong visibility and styling
- **Prominent Titles**: Increased title to 1.8rem with heavy text shadows (3px 8px) and z-index 20
- **Label Enhancement**: Section labels 1.1rem, font-weight 700, letter-spacing 2px, uppercase
- **Strong Contrast**: Enhanced gradient (rgba 0.95/0.8/0.5) for excellent text readability
- **Proper Display**: Added explicit display:block and positioning for reliable title rendering
**Rationale**:
- User wants clean, minimal mobile experience with titles hidden by default
- Click interaction should provide clear, prominent title display for section identification
- Strong contrast and sizing ensure titles are easily readable when they do appear
- Maintains mobile-first design philosophy with progressive disclosure
**Result**: Clean mobile sections by default, prominent titles only when clicked
**Files Modified**: `css/style.css` - Mobile overlay visibility, click-expanded title styling

## Mobile Overlay Visibility & Social Icon Proximity Fix (2025-01-12)
**Decision**: Fix missing section titles on mobile click + eliminate visual gap between signature and social icons
**Problem**: 
- Mobile `.content-overlay` had `opacity: 0` default with no base visibility rule in 480px media query
- Social icons positioned too far from signature despite gap reduction to 0.08rem
**Solution Approach**:
- **Overlay Visibility**: Added base `opacity: 1 !important` to mobile content overlay in 480px media query
- **Enhanced Gradient**: Optimized background gradient with better contrast ratios (rgba 0.85/0.6/0.3)
- **Mobile Padding**: Set appropriate padding `2rem 1.5rem` for mobile text readability
- **Social Icon Proximity**: Set `gap: 0rem` for both 480px and 360px breakpoints
- **Negative Margin**: Added `margin-top: -0.3rem` to social icons for tight visual connection to signature
**Rationale**:
- User reported "title not visible of the section" indicating overlay opacity issue
- Mobile click expansion relied on `.mobile-expanded .content-overlay` but base overlay was hidden
- Visual cohesion requires social icons to appear connected to signature, not floating below
- Negative margin pulls icons closer without affecting functionality or touch targets
**Result**: Section titles immediately visible on mobile click, social icons positioned tight against signature
**Files Modified**: `css/style.css` - Mobile overlay visibility rules, social icon gap/margin adjustments

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

## Mobile Navbar Shake Fix (2025-01-12)
**Decision**: Change mobile section expansion transition from `all` to `transform` only
**Problem**: User reported "the navbar does a weird shake remove and fix this" when clicking sections on mobile
**Root Cause**: `transition: all 0.6s` on `.mobile-expanded` was causing excessive browser layout recalculations that affected the fixed navbar positioning during section scaling animations
**Solution Approach**:
- **Targeted Transition**: Changed from `transition: all` to `transition: transform 0.6s` to only animate the transform property
- **Performance Optimization**: Added `will-change: transform` to hint browser for optimization
- **Maintained Functionality**: Preserves existing mobile section expansion behavior without layout interference
- **Technical Impact**: Eliminates layout reflows that were causing the navbar to shake/jitter
**Rationale**:
- `transition: all` is a performance anti-pattern that causes unnecessary recalculations
- Fixed navbar with `z-index: 1000` was still affected by layout changes in other elements during broad transitions
- Targeting only the `transform` property reduces browser work and eliminates visual artifacts
- Modern browsers optimize transform animations better when they're isolated
**Result**: Mobile sections expand smoothly without navbar shake, maintaining user experience quality
**Files Modified**: `css/style.css` - Mobile expansion transition optimization 