# 🚀 Modern Portfolio Website

A stunning, interactive portfolio website built with React, TypeScript, and cutting-edge web technologies. Features a cyberpunk-inspired design with smooth animations, 3D elements, and a custom particle background system.

![Portfolio Preview](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 🎨 **Modern UI/UX Design** - Sleek, cyberpunk-inspired interface with glassmorphism effects
- 🌟 **Interactive Particle Background** - Dynamic canvas-based particle system with mouse interaction
- 🎭 **Custom Cursor** - Animated custom cursor with trail effects (desktop only)
- 📱 **Fully Responsive** - Optimized for all devices from mobile to desktop
- 🎬 **Smooth Animations** - Scroll-triggered animations and page transitions
- 🌐 **3D Graphics** - Three.js integration for 3D elements and scenes
- 📧 **Contact Form** - Integrated EmailJS for seamless contact functionality
- 🎯 **SEO Optimized** - Built with best practices for search engine optimization
- ⚡ **Lightning Fast** - Built with Vite for optimal performance

## 🛠️ Tech Stack

### Core Technologies
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 5.4.19** - Next-generation frontend tooling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework

### UI Components & Libraries
- **shadcn/ui** - High-quality React components built with Radix UI
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful & consistent icon library
- **React Hook Form** - Performant form validation
- **Zod** - TypeScript-first schema validation

### 3D & Animations
- **Three.js 0.170.0** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **Tailwind CSS Animate** - Animation utilities

### Additional Features
- **React Router DOM** - Client-side routing
- **EmailJS** - Email service integration
- **TanStack Query** - Powerful data synchronization
- **Recharts** - Composable charting library
- **Sonner** - Toast notifications

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/your-portfolio.git
cd your-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

4. **Start development server**
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 🚀 Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Build for development (with source maps)
npm run build:dev

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── DesignDecisionsSection.tsx
│   │   ├── Footer.tsx
│   │   ├── GlobeScene.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navigation.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── PublicationsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   └── WelcomeIntro.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.tsx
│   │   └── useSmoothScroll.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── public/
├── .env
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Customization

### Colors & Theme
Modify the color scheme in `src/index.css`:
```css
:root {
  --primary: 190 100% 50%;    /* Cyan */
  --secondary: 260 100% 65%;  /* Purple */
  --background: 222 47% 5%;   /* Dark blue */
}
```

### Content
- **Hero Section**: Edit `src/components/HeroSection.tsx`
- **About**: Update `src/components/AboutSection.tsx`
- **Projects**: Modify `src/components/ProjectsSection.tsx`
- **Skills**: Edit `src/components/SkillsSection.tsx`

### Particle Background
Customize particle effects in `src/components/ParticleBackground.tsx`:
- Particle count
- Animation speed
- Colors and opacity
- Grid density

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

The optimized build will be in the `dist` folder.

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### Deploy to GitHub Pages
1. Update `vite.config.ts`:
```ts
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

2. Build and deploy:
```bash
npm run build
npm run deploy
```

## 📧 EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Copy your credentials to `.env`

## 🎯 Performance Optimization

- ⚡ **Lazy Loading** - Components loaded on demand
- 🖼️ **Image Optimization** - Optimized images and assets
- 📦 **Code Splitting** - Automatic code splitting with Vite
- 🎨 **CSS Optimization** - Tailwind CSS purging unused styles
- 🚀 **Fast Refresh** - Lightning-fast HMR with Vite

## 🌟 Key Features Breakdown

### Particle Background System
- Canvas-based rendering for performance
- Dynamic mouse interaction
- Responsive particle count based on device
- Animated grid following cursor

### Custom Cursor
- Smooth position tracking
- Trail effects
- Blend mode for visual impact
- Hidden on mobile devices

### Smooth Scrolling
- Custom scroll behavior
- Section-based navigation
- Scroll reveal animations
- Parallax effects

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Your Name**
- Website: [your-website.com](https://your-website.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [your-profile](https://linkedin.com/in/your-profile)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Lucide Icons](https://lucide.dev/) - Icon library
- [Three.js](https://threejs.org/) - 3D library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

## 📸 Screenshots

### Desktop View
![Desktop Screenshot](link-to-screenshot)

### Mobile View
![Mobile Screenshot](link-to-screenshot)

### Dark Theme
![Dark Theme Screenshot](link-to-screenshot)

---

⭐ **If you found this project helpful, please give it a star!** ⭐

Made with ❤️ and lots of ☕
