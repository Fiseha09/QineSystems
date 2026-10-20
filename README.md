# Qine Systems Landing Page

> **The Art of Code. The Depth of Logic.**

A modern, highly responsive, and accessible landing page for Qine Systems - a "Zero to Hero" software development educational platform for university students and beginners at Bahir Dar University.

## 🎨 Design Features

### Visual Theme
- **Color Palette**: Deep Indigo (#1E1B4B), Dark Obsidian (#0F0F1E) backgrounds
- **Accent Colors**: Electric Violet (#6D28D9), Cyber Neon Blue (#06B6D4), Radiant Gold (#D97706)
- **Aesthetics**: High-contrast cyber theme with glowing borders, floating code particles, hexagonal patterns

### Key Visual Elements
- Animated floating code brackets ({ }, </>, [ ], ( ))
- Gradient text effects on headlines
- Glowing button hover states
- Hexagonal grid patterns
- Smooth scroll animations
- Card hover effects with transforms

## 📋 Sections

1. **Global Navigation Bar**
   - Responsive mobile hamburger menu
   - Smooth scroll to sections
   - Sticky header with backdrop blur
   - CTA button: "Join Telegram Community"

2. **Hero Section**
   - Main headline with gradient text
   - University badges (BDU, @QineSystems)
   - Primary actions (Browse Courses, View Roadmap)
   - Floating animated code particles

3. **Qine Academy**
   - 3 Course cards with status badges:
     - Foundations of Logic & Python (LIVE)
     - Web Architectures & Full-Stack Apps (LIVE)
     - Data Structures & Algorithmic Logic (COMING SOON)
   - Student perks grid (Bootcamps, Code Reviews, Portfolio)

4. **Future Roadmap**
   - 4 Locked enterprise track cards:
     - Custom Software & Web Engineering
     - Internet of Things (IoT) & Automation
     - Artificial Intelligence & Deep Learning
     - Cybersecurity & Cryptography

5. **Open Source Section**
   - GitHub collaboration information
   - Link to repositories

6. **Contact Section**
   - Validated contact form (Name, Email, Affiliation, Message)
   - Social channel highlights (Telegram, YouTube, Campus)

7. **Footer**
   - Brand tagline
   - Quick navigation links
   - Copyright notice

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required - pure HTML/CSS/JS

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! The site is ready to use.

### Local Development Server (Optional)

For testing with live reload, you can use any local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## ♿ Accessibility Features

### WCAG 2.1 Compliance Efforts

- ✅ **Semantic HTML**: Proper heading hierarchy (h1-h4), landmarks (nav, main, footer)
- ✅ **ARIA Labels**: All interactive elements have descriptive labels
- ✅ **Keyboard Navigation**: Full keyboard accessibility with visible focus states
- ✅ **Color Contrast**: High contrast ratios for text readability
- ✅ **Form Validation**: Real-time error messages with aria-live regions
- ✅ **Responsive Design**: Mobile-first approach, works on all devices
- ✅ **Reduced Motion**: Respects prefers-reduced-motion settings
- ✅ **Alt Text**: All decorative SVGs marked with aria-hidden="true"
- ✅ **Focus Management**: Custom focus indicators with 3px outline

### Testing Accessibility

1. **Keyboard Navigation Test**:
   - Press `Tab` to navigate through interactive elements
   - Press `Enter` or `Space` to activate buttons/links
   - Press `Escape` to close mobile menu

2. **Screen Reader Test**:
   - Use NVDA (Windows), JAWS (Windows), or VoiceOver (Mac)
   - All sections should be announced correctly
   - Form errors should be read aloud

3. **Zoom Test**:
   - Zoom to 200% in browser
   - All content should remain readable and functional

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px and above

### Mobile Features
- Hamburger menu navigation
- Stacked layout for cards and grids
- Full-width buttons
- Optimized touch targets (minimum 44x44px)

## 🎯 Browser Support

- ✅ Chrome (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ Edge (last 2 versions)
- ⚠️ IE11 (partial support - no CSS Grid, no backdrop-filter)

## 🔧 Customization

### Colors
Edit CSS variables in `styles.css`:

```css
:root {
    --deep-indigo: #1E1B4B;
    --electric-violet: #6D28D9;
    --cyber-blue: #06B6D4;
    --radiant-gold: #D97706;
    /* ... more variables */
}
```

### Content
Edit text directly in `index.html`. All content is marked with semantic classes for easy identification.

### Animations
Adjust animation speeds in `styles.css`:

```css
:root {
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```

## 📊 Performance

### Optimization Techniques
- CSS animations use `transform` and `opacity` (GPU-accelerated)
- Throttled scroll events (100ms delay)
- Lazy loading setup for future images
- Minimal JavaScript bundle (no frameworks)
- Font preloading for critical typefaces

### Lighthouse Scores (Target)
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 95+

## 🧪 Testing Checklist

### Functionality Tests
- [ ] Navigation links scroll to correct sections
- [ ] Mobile menu opens/closes correctly
- [ ] Contact form validates all fields
- [ ] Form submission shows success message
- [ ] All external links open in new tabs
- [ ] Smooth scroll behavior works on all browsers

### Visual Tests
- [ ] Gradient text renders correctly
- [ ] Glowing effects visible on hover
- [ ] Particles animate smoothly
- [ ] Cards have proper hover states
- [ ] Status badges display correct colors
- [ ] Lock icons appear on roadmap cards

### Responsive Tests
- [ ] Mobile menu works on small screens
- [ ] Cards stack properly on mobile
- [ ] Typography scales appropriately
- [ ] Touch targets are large enough (44x44px minimum)
- [ ] Horizontal scroll never appears

### Accessibility Tests
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] ARIA labels are descriptive
- [ ] Form errors are announced
- [ ] Heading hierarchy is correct (h1 → h2 → h3 → h4)
- [ ] Color contrast ratios pass WCAG AA
- [ ] Screen reader can navigate site

## 🐛 Known Issues

None currently. Please report issues via Telegram: t.me/QineSystems

## 📝 Form Integration

The contact form currently logs to console. To connect to a backend:

### Option 1: FormSubmit (No backend needed)
```html
<form action="https://formsubmit.co/your@email.com" method="POST">
```

### Option 2: Custom API
Edit the `handleSubmit()` method in `script.js`:

```javascript
async handleSubmit() {
    const formData = {
        name: this.nameInput.value,
        email: this.emailInput.value,
        affiliation: document.getElementById('affiliation').value,
        message: this.messageInput.value
    };
    
    const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    
    // Handle response...
}
```

## 🌐 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select branch and root folder
4. Site will be live at `username.github.io/QineSystems`

### Netlify
1. Drag and drop folder to Netlify
2. Site deploys automatically
3. Custom domain setup available

### Vercel
```bash
npm i -g vercel
vercel
```

## 📞 Contact & Support

- **Telegram**: [t.me/QineSystems](https://t.me/QineSystems)
- **YouTube**: [@QineSystems](https://youtube.com/@QineSystems)
- **Campus**: Bahir Dar University, Poly Campus

## 📄 License

© 2026 Qine Systems. Technology | Engineering | Wisdom. All rights reserved.

---

**Built with ❤️ by Qine Systems Team**

*Bridging ancient scholarly logic with cutting-edge tech*
