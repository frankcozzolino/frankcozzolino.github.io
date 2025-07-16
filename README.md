# Frank Cozzolino - Personal Website

A modern, responsive personal portfolio website showcasing professional experience, skills, and interests across multiple interactive pages.

## 🌟 Features

### Multi-Page Portfolio
- **Home Page**: Professional introduction with gray-blue navigation theme
- **Sailing Timeline**: Interactive timeline with purple waves effect
- **Coder Portfolio**: Development projects with orange birds effect  
- **Project Management**: Professional experience with blue clouds effect
- **Hobbies**: Personal interests with vibrant green cells effect
- **Blog**: RSS-integrated articles with blue NET effect

### Interactive Visual Effects
- **Vanta.js Animations**: Each page features unique animated backgrounds
- **Responsive Design**: Optimized for desktop and mobile devices
- **Page-Specific Themes**: Color-coordinated navigation and effects per page
- **Professional Navigation**: Consistent navbar with signature branding

### Content Systems
- **Blog Integration**: RSS-based Medium article integration
- **Sailing Timeline**: JSON-driven timeline with planned activities
- **Hobby Categories**: 7 distinct hobby areas with icons and descriptions
- **Social Integration**: WhatsApp, Discord, and LinkedIn connectivity

## 🚀 Live Demo

Visit the website at: [frankcozzolino.github.io](https://frankcozzolino.github.io)

## 🛠️ Technical Implementation

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with custom animations
- **JavaScript**: Interactive functionality and API integration
- **Vanta.js**: 3D animated backgrounds with Three.js/p5.js
- **RSS Integration**: Dynamic blog content loading
- **JSON Data**: Structured content management

### Dependencies
- **Three.js r134**: 3D graphics library for Vanta.js effects
- **p5.js 1.1.9**: Animation calculations and rendering
- **Vanta.js**: Latest CDN version for background effects
- **Inter Font**: Google Fonts integration for typography

### Page-Specific Effects
- **Sailing**: Purple waves (0x23153c) - oceanic theme
- **Project Management**: Blue clouds (0x68b8d7) - professional sky
- **Hobbies**: Vibrant green cells (0x00ff7f, 0x32cd32) - energetic
- **Coder**: Orange/yellow birds (0xff8c00, 0xffd700) - creative
- **Blog**: Blue NET effect with article grid
- **Home**: Clean presentation with gray-blue accents

## 📁 Project Structure

```
frankcozzolino.github.io/
├── index.html                    # Main homepage
├── sailing-timeline.html         # Sailing experiences & timeline
├── sailing-timeline-data.json    # Timeline entries data
├── project-management.html       # Professional PM experience
├── hobbies.html                  # Personal interests showcase
├── coder.html                    # Development portfolio
├── blog.html                     # RSS-integrated blog
├── css/
│   └── style.css                 # Main stylesheet
├── images/                       # Assets and imagery
├── docs/                         # Documentation files
├── context/                      # Development documentation
│   ├── state.md                  # Current project state
│   ├── schema.md                 # Technical specifications
│   ├── decisions.md              # Technical decisions log
│   └── insights.md               # Development insights
└── README.md                     # This file
```

## 🎨 Design Features

### Visual Themes
- **Consistent Navigation**: Professional navbar with signature branding
- **Color Coordination**: Each page has unique color schemes
- **Responsive Layout**: Mobile-optimized design patterns
- **Interactive Elements**: Hover effects and smooth transitions

### Content Areas
- **Hydroponics**: Growing plants without soil using nutrient solutions
- **Writing**: Crafting stories, articles, and creative content  
- **Trading**: Analyzing financial markets and investment strategies
- **Astrophotography**: Capturing celestial objects and night sky phenomena
- **Electronics**: Building circuits and electronic projects
- **Archaeology**: Exploring ancient civilizations and artifacts
- **GeoGuessing**: Using geographical clues to identify world locations

## 🚀 Getting Started

### Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/frankcozzolino/frankcozzolino.github.io.git
   ```

2. Navigate to the project directory:
   ```bash
   cd frankcozzolino.github.io
   ```

3. Open with a local server (recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using Live Server extension in VS Code
   ```

4. Visit `http://localhost:8000` in your browser

### Deployment
- **GitHub Pages**: Automatically deployed from main branch
- **Custom Domain**: Configure in repository settings
- **CDN Integration**: Vanta.js and fonts loaded from CDN

## 📝 Content Management

### Updating Timeline Data
Edit `sailing-timeline-data.json` to modify sailing timeline entries:
```json
{
  "date": "2025-01-15",
  "title": "New Timeline Entry",
  "description": "Entry description",
  "category": "achievement"
}
```

### Adding Blog Content
The blog page integrates with RSS feeds. Update the RSS URL in `blog.html` to connect your own blog source.

### Modifying Hobby Categories
Edit the hobby cards in `hobbies.html` to customize interests and descriptions.

## 🎯 Performance Optimization

- **CDN Usage**: External libraries loaded from CDN
- **Responsive Images**: Optimized for different screen sizes
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Mobile Optimization**: Touch-friendly navigation and interactions

## 🔧 Development Notes

### Recent Updates
- Simplified hobbies page with 7 hobby categories
- Added page-specific navigation hover colors
- Implemented RSS-based article system for blog
- Fixed all Vanta.js effects with proper dependencies
- Updated all pages with unique color schemes

### Known Limitations
- RSS integration requires CORS-enabled feed
- Vanta.js effects require WebGL support
- Some effects may impact performance on low-end devices

## 📧 Contact

**Frank Cozzolino**
- LinkedIn: [cozzolinofrancesco](https://www.linkedin.com/in/cozzolinofrancesco/)
- Website: [frankcozzolino.github.io](https://frankcozzolino.github.io)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Last updated: January 2025*