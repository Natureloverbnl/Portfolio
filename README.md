# React Portfolio - Professional Photography Site

A modern, high-end photography portfolio built with React, Tailwind CSS, and Framer Motion.

## 🚀 Features

### Navigation with Mega Menu
- **Editorial Header**: Clean, professional navigation design
- **Mega Menu**: 3-column dropdown with hover activation
  - **Narrative Column**: Landscape, Portrait, Culture categories
  - **Commercial Column**: NGO Documentation, Editorial, Print Shop
  - **Visual Column**: Large featured image thumbnail
- **Dark Aesthetic**: `bg-[#1a1a1a]` with `text-white/70` and `#4a7c59` hover states

### Filterable Animated Masonry Gallery
- **Category Filters**: ['All', 'Portrait', 'Landscape', 'Street', 'Culture']
- **AnimatePresence mode='popLayout'**: Smooth filtering transitions
- **Masonry Layout**: CSS columns for natural flow
- **Shimmer Loading**: Subtle loading animation for images
- **Hover Effects**: Scale (1.05x) with overlay containing title and location icon

### Advanced Animations
- **Framer Motion**: Professional-grade animations
- **Scroll-triggered**: Elements animate in on viewport entry
- **Staggered Loading**: Sequential animation delays
- **3D Transforms**: Perspective rotations and scaling

### Mobile Optimization
- **Responsive Mega Menu**: Converts to drawer/collapsible on mobile
- **Horizontal Scroll Filters**: Filter bar scrolls on small screens
- **Touch-friendly**: Optimized for mobile interactions

## 🛠️ Tech Stack

- **React 18** - Modern component architecture
- **Vite** - Fast development server and build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Production-ready animations
- **ESLint** - Code quality and consistency

## 📁 Project Structure

```
react-portfolio/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx    # Mega menu navigation
│   │   └── Gallery.jsx       # Filterable masonry gallery
│   ├── data/
│   │   └── portfolioData.js  # Image data and categories
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # React entry point
│   └── index.css             # Tailwind styles
├── index.html                # HTML template
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
└── vite.config.js           # Vite configuration
```

## 🏃‍♂️ Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

## 🎨 Key Implementation Details

### Mega Menu Logic
```jsx
// Hover activation with AnimatePresence
const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

// Smooth enter/exit animations
<AnimatePresence>
  {isMegaMenuOpen && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* 3-column layout */}
    </motion.div>
  )}
</AnimatePresence>
```

### Gallery Filtering
```jsx
// State management for filtering
const [selectedCategory, setSelectedCategory] = useState('All');

// AnimatePresence with popLayout mode
<AnimatePresence mode="popLayout">
  <motion.div layout className="columns-1 md:columns-2 lg:columns-3">
    {filteredImages.map((image) => (
      <motion.div
        key={image.id}
        layout  // This enables smooth repositioning
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        {/* Image content */}
      </motion.div>
    ))}
  </motion.div>
</AnimatePresence>
```

### Data Structure
```javascript
export const portfolioData = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-...',
    category: 'Landscape',
    title: 'Rural Nepal',
    location: 'Nepal'
  },
  // ... 9 more items
];
```

## 🎯 Design Philosophy

- **Professional Editorial Style**: Inspired by Leica and Magnum Photos
- **Performance First**: Optimized animations and lazy loading
- **Accessibility**: Keyboard navigation and screen reader support
- **Mobile-First**: Responsive design with touch interactions
- **Dark Mode**: Reduces eye strain and emphasizes imagery

## 📱 Mobile Features

- **Collapsible Navigation**: Mega menu becomes mobile drawer
- **Horizontal Filter Scroll**: Category buttons scroll horizontally
- **Touch Gestures**: Swipe-friendly interactions
- **Optimized Loading**: Mobile-specific image sizes

## 🔧 Customization

### Adding New Images
1. Add to `portfolioData.js` array
2. Include: `id`, `src`, `category`, `title`, `location`
3. Use high-quality Unsplash URLs for best results

### Modifying Categories
1. Update `categories` array in `portfolioData.js`
2. Ensure gallery filtering logic handles new categories

### Styling Changes
- **Colors**: Modify Tailwind config or use custom CSS variables
- **Typography**: Update font imports in `index.html`
- **Spacing**: Adjust Tailwind classes in components

## 🚀 Deployment

The project is ready for deployment to:
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Configure with GitHub Actions

## 📈 Performance

- **Lazy Loading**: Images load as they enter viewport
- **Code Splitting**: React components are chunked
- **Optimized Bundles**: Vite's tree-shaking and minification
- **Image Optimization**: Responsive images with proper sizing

---

Built with ❤️ for professional photographers who demand excellence in both craft and presentation.
git add .
git commit -m "trigger fresh build"
git push origin main