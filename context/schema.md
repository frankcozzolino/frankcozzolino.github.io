# Project Schema

## File Structure
```
.
├── index.html          # Main single-page website
├── css/
│   └── style.css      # All styles including slanted sections
├── images/            # Hero carousel & section backgrounds
│   ├── hero1.jpg
│   ├── hero2.jpg
│   ├── hero3.jpg
│   ├── you.jpg
│   ├── photography.jpg
│   ├── drone.jpg
│   └── woodwork.jpg
├── docs/              # PDF resume storage
│   └── resume.pdf
└── context/           # Session continuity docs
    ├── state.md
    ├── schema.md
    ├── decisions.md
    └── insights.md
```

## Key Sections
- **Hero**: Full-height carousel with navigation
- **Sailing**: Skills radar chart + interactive map
- **Professional**: Timeline + certifications sidebar
- **Coding**: GitHub-style portfolio with projects and skills
- **Hobbies**: Card grid with overlay text

## CSS Classes
- `.slant-top`: Diagonal top edge via clip-path
- `.slant-bottom`: Diagonal bottom edge via clip-path  
- `.grid-2`, `.grid-3`: Responsive grids
- `.hero`, `.section`, `.container`: Layout containers
- `.btn`: Button styling
- `.timeline`, `.cards`: Component styling

## Interactive Elements
- Hero carousel (3 images)
- Map integration (Mapbox/Google Maps)
- Skills radar chart (Chart.js)
- Responsive navigation 