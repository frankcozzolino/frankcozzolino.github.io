# Project Insights

## Key Findings

### 2025-01-12 23:45 - VIEWPORT LAYOUT ARCHITECTURE ISSUE
- **Multiple Spacing Conflicts**: margin-top + calc() subtract created double spacing gaps
- **CSS Reset Importance**: Missing html/body height: 100% caused viewport calculation errors
- **Mobile Responsive Complexity**: Different navbar heights (80px desktop, 120px mobile) required separate padding values
- **Legacy Code Interference**: Old .image-gallery styles (60vh) conflicted with new .diagonal-gallery (100vh)
- **Fixed Positioning vs Flow**: margin-top doesn't work well with fixed navbar + full viewport requirements

### 2025-01-12 22:30 - CRITICAL ICON DISCOVERY
- **Font Awesome ≠ Official Brand Icons**: Icon libraries provide their own interpretations, not official brand designs
- **User Recognition**: Users can distinguish between icon library versions and authentic brand icons
- **Implementation Impact**: SVG icons require `fill` property in CSS, not `color` like icon fonts
- **Authenticity Matters**: Professional websites should use official brand assets for credibility
- **Technical Switch**: Removing Font Awesome dependency reduced page weight while improving authenticity

### 2025-06-29 21:06 - Initial Setup
- Repository is clean GitHub Pages site (frankcozzolino.github.io)
- PowerShell command syntax differs from bash (mkdir without -p flag)
- Project structure follows modern single-page application pattern

## Design Patterns
- **Diagonal sections**: Creates visual flow and modern aesthetic
- **Grid-based layout**: Ensures consistent spacing and alignment
- **Color hierarchy**: Darker to lighter blues create depth
- **Content organization**: Logical flow from personal to professional to hobbies

## Technical Considerations
- **Clip-path support**: Modern browsers only (IE11+ fallback needed)
- **Viewport units**: 100vh hero may need mobile adjustments
- **Image optimization**: Large hero images need compression
- **Performance**: Minimal dependencies for fast loading

## User Experience
- **Navigation**: Clear section jumping from hero
- **Visual hierarchy**: Strong typography and whitespace
- **Mobile-first**: Responsive grid collapse on small screens
- **Accessibility**: Semantic HTML structure supports screen readers 