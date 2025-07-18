# Frank Cozzolino - Personal Website

A professional portfolio website with blog functionality, RSS feed, and Progressive Web App features.

## Features

- **Portfolio Sections**: Home, Sailing, Coder, Project Management, Hobbies, Blog
- **Blog Integration**: Dynamic loading of Medium articles with full content viewer
- **RSS Feed**: Automatically generated RSS feed with latest Medium articles
- **Progressive Web App**: Offline support with Service Worker caching
- **Responsive Design**: Mobile-friendly and optimized for all devices
- **Image Optimization**: Automatic image extraction from articles

## RSS Feed

The website includes a fully automated RSS feed that pulls from Medium articles:

### RSS Feed URLs
- **Primary**: `https://frankcozzolino.github.io/rss.xml`
- **Redirect**: `https://frankcozzolino.github.io/rss` (redirects to RSS XML)

### RSS Features
- **Auto-Discovery**: RSS feed is automatically detected by RSS readers
- **Rich Content**: Full article content with HTML formatting
- **Image Support**: First image from each article included as enclosure
- **Categories**: Proper categorization from Medium tags
- **Offline Support**: Cached by Service Worker for offline reading

### Manual RSS Update
To manually update the RSS feed with latest Medium articles:

```bash
node scripts/generate-rss.js
```

### Automated Updates
The RSS feed is automatically updated daily at 9:00 AM UTC via GitHub Actions. The workflow:

1. Fetches latest Medium articles
2. Generates new RSS XML
3. Commits changes if new articles are found
4. Pushes updates to GitHub Pages

### Local RSS Update (Windows)
Run the batch script for local updates with Git integration:

```bash
scripts/update-rss.bat
```

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, Custom Properties
- **PWA**: Service Worker, Web App Manifest
- **RSS Generation**: Node.js custom parser
- **Automation**: GitHub Actions
- **Hosting**: GitHub Pages
- **External APIs**: Medium RSS feed

## Development

### Prerequisites
- Node.js 18+ (for RSS generation)
- Git (for automated updates)

### Local Development
1. Clone the repository
2. Open `index.html` in your browser
3. For RSS updates: `node scripts/generate-rss.js`

### RSS Feed Development
The RSS feed is generated from Medium articles using a custom Node.js parser that:
- Fetches Medium RSS feed via HTTPS
- Parses XML with CDATA handling
- Extracts first image from each article
- Generates clean RSS 2.0 XML
- Creates URL-friendly article IDs

### Deployment
The site is automatically deployed via GitHub Pages. RSS updates are handled by GitHub Actions.

## File Structure

```
.
├── index.html              # Home page
├── blog.html               # Blog viewer
├── rss.xml                 # Generated RSS feed
├── rss                     # RSS redirect page
├── css/
│   └── style.css          # Main stylesheet
├── scripts/
│   ├── generate-rss.js    # RSS generation script
│   └── update-rss.bat     # Windows update script
├── .github/
│   └── workflows/
│       └── update-rss.yml # GitHub Action for RSS updates
├── images/                # Image assets
├── sw.js                  # Service Worker
└── manifest.json          # PWA manifest
```

## RSS Feed Technical Details

### RSS 2.0 Format
- Valid RSS 2.0 XML with proper namespaces
- `content:encoded` for full HTML content
- `dc:creator` for author attribution
- `enclosure` elements for images
- Categories extracted from Medium tags

### Image Extraction
The RSS generator automatically extracts the first meaningful image from each Medium article:
- Skips tracking pixels and tiny images
- Filters out images smaller than 100px
- Prioritizes content images over decorative ones
- Includes as `<enclosure>` element in RSS

### Automated Updates
- **Schedule**: Daily at 9:00 AM UTC
- **Trigger**: GitHub Actions workflow
- **Process**: Fetch → Parse → Generate → Commit → Deploy
- **Fallback**: Manual trigger available

## License

This project is open source and available under the MIT License.