# Project State - Frank Cozzolino Website

## Current Status: ✅ COMPLETED - RSS Feed Updated with Latest Medium Articles

### Last Completed Action (2025-10-20 09:52 UTC)
- **RSS Feed Refresh**: Updated `rss.xml` with the latest 10 Medium posts
- **Top New Articles**:
  - The Four Patterns Before Every Market Crash and Why the AI Boom Now Fits the Script (Oct 19, 2025)
  - They Think They Know When The Universe will end. (Oct 19, 2025)
  - What Sora 2 Says About the AI Bubble? (Oct 18, 2025)
- **Content Verification**: Images extracted and `<content:encoded>` present for all items
- **Git Push**: Local commit created; push from script failed. Next step: run `git push origin main` manually if needed

### Maritime Navigation Trainer Mobile Features
- **Collapsible HUD**: Main control panel can be collapsed to hamburger menu icon
- **Collapsible Spawn Panel**: Vessel spawning controls can be minimized for mobile
- **Auto-Collapse**: Menus automatically collapse after 2 seconds on mobile interactions
- **Responsive Breakpoints**: 768px for tablet, 480px for smartphone optimizations
- **Touch Optimization**: Larger touch targets and improved spacing for mobile devices
- **Status Removal**: Removed status panel completely for cleaner mobile interface

### RSS Feed Implementation Details
- **RSS Feed URL**: `/rss.xml` (also accessible via `/rss` redirect)
- **RSS Format**: Valid RSS 2.0 XML with content:encoded, Dublin Core, and enclosures
- **RSS Discovery**: `<link rel="alternate" type="application/rss+xml">` added to all HTML pages
- **Content Source**: Real Medium articles from francesco.cozzolino feed
- **Image Support**: First image from each article included as enclosure element

### Image Extraction Features
- **Smart Filtering**: Skips tracking pixels and tiny images
- **Size Filtering**: Filters out images smaller than 100px
- **Content Priority**: Prioritizes content images over decorative ones
- **RSS Standard**: Uses `<enclosure>` element for proper RSS image support
- **Automatic Detection**: Extracts from Medium's complex HTML structure

### Automated Update System
- **GitHub Actions**: Daily updates at 9:00 AM UTC (`/.github/workflows/update-rss.yml`)
- **Windows Script**: Local batch script (`/scripts/update-rss.bat`) with Git integration
- **Manual Command**: `node scripts/generate-rss.js` for direct updates
- **Change Detection**: Only commits and pushes when new articles are found
- **Error Handling**: Comprehensive error handling and logging

### Real Articles with Images (Latest 10) - Updated 2025-09-25
1. "The Lifelong Learning Manifesto: Why Education Must Be Reinvented for a 100+ Years of Working Life" (Sep 21, 2025)
   - Image: https://cdn-images-1.medium.com/max/1024/1*IJL_0QBwUAIDeJQJs7uM5Q.png
2. "Do Mushrooms Communicate? A Concise, Scientific Look at Fungal Signalling" (Aug 16, 2025)
   - Image: https://cdn-images-1.medium.com/max/1024/1*tE7vLDQArpkZOzBIc4CbeQ.png
3. "AI isn't delivering value" and "Why Firing People for AI Agents is a Costly Mistake" (Jul 17, 2025)
   - Image: https://cdn-images-1.medium.com/max/1024/1*-XloYdAw_hSW_izDAL06_Q.png
4. 7 additional articles with extracted images including ET communication, Google Auth, WWW future, Vibe Coding series, etc.

### RSS Feed Features
- **Valid RSS 2.0**: Proper XML structure with all required elements
- **Full Content**: Complete HTML content in `<content:encoded>` sections
- **Rich Metadata**: Title, description, publication date, categories, creator
- **Image Support**: First image from each article as `<enclosure>` element
- **Blog Integration**: URLs point to blog.html with generated article IDs
- **Offline Access**: Cached by Service Worker for offline reading
- **Auto-Generated**: Updates automatically with latest Medium articles

### Technical Implementation
- **Generation Script**: `scripts/generate-rss.js` - Enhanced Node.js script
- **Image Extraction**: Custom parser that identifies meaningful images
- **XML Processing**: Handles complex CDATA structures from Medium
- **Article Processing**: Generates clean article IDs and excerpts
- **GitHub Actions**: Automated daily updates with change detection
- **Git Integration**: Automatic commits and pushes when content changes

### Active Tasks & Blockers
- **NONE** - RSS feed fully implemented with images and auto-updates

### Next Steps
- **Testing**: Verify RSS feed images display correctly in RSS readers
- **Monitoring**: Monitor GitHub Actions workflow execution
- **Optional**: Add RSS feed link to website navigation
- **Optional**: Add feed analytics tracking

### Hackathons & Projects Section - COMPLETED ✅
- **Created**: `hackathons-projects.html` - New dedicated page for showcasing hackathons and projects
- **Features**:
  - Card-based layout with images, titles, descriptions, and external links
  - Filter buttons (All Projects, Hackathons, Personal Projects)
  - Responsive design for mobile and desktop
  - Animated background and modern styling
- **Data Structure**: `projects-data.json` - JSON file for adding real project entries with metadata
- **Status**: Mock data removed, ready for real projects and hackathons
- **Navigation**: Updated all HTML pages to include "Hackathons & Projects" in Projects dropdown
- **Styling**: Consistent with existing website theme, uses animated background particles
- **Interactive**: Filter functionality, hover effects, and smooth transitions
- **Technical**: Async JSON loading for maintainable content management

### Usage Instructions
**Manual Update**:
```bash
node scripts/generate-rss.js
```

**Local Update with Git** (Windows):
```bash
scripts/update-rss.bat
```

**GitHub Actions**: Runs automatically daily at 9:00 AM UTC

### RSS Feed Structure
- **Feed URL**: https://frankcozzolino.github.io/rss.xml
- **Articles**: 10 latest Medium articles with images
- **Categories**: Extracted from Medium (ai, product-management, astronomy, etc.)
- **Images**: First meaningful image from each article as enclosure
- **Content**: Full HTML content preserved from Medium posts