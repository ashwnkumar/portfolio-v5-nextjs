# 🎨 Developer Portfolio (v4)

> My old portfolio website. The one before this one you're viewing right now.

## The Problem I Was Solving

Every developer needs a portfolio, but most portfolio templates look exactly the same. You know the ones - hero section, about me, projects grid, contact form. Rinse and repeat.

I wanted something different. Something that felt like me - clean, modern, but with personality. I'd been seeing Bento Grid layouts everywhere (Apple's design language, dashboard UIs, modern web apps) and thought: what if I built my entire portfolio around that aesthetic?

So I did. This was my fourth portfolio iteration, and honestly, I was pretty proud of it. It served me well for a while before I rebuilt everything from scratch (the site you're viewing right now is v5).

## What Makes It Different?

**Bento Grid Layout**: The entire homepage is a custom CSS Grid implementation that looks like a jigsaw puzzle. Each card is a different size, creating visual interest without feeling chaotic. It took hours of tweaking `grid-template-columns` and `grid-column-span` to get right, but that's the kind of CSS challenge I actually enjoy.

**Multiple Theme System**: Not just dark/light mode - multiple color schemes with smooth transitions. Because why settle for two themes when you can have five?

**Meta Portfolio Piece**: This portfolio itself became a portfolio piece. Building a complex grid layout, implementing a theme system, and creating a cohesive design language - all skills worth showcasing.

## Features

- 🎨 **Bento Grid Layout** - Custom CSS Grid implementation with asymmetric cards
- 🎭 **Multiple Themes** - Five different color schemes with smooth transitions
- 📱 **Fully Responsive** - Mobile-first design that adapts to all screen sizes
- 📧 **Contact Form** - Functional contact form powered by Resend API
- 💬 **Quote Generator** - Random quotes on the homepage for personality
- 🎯 **Project Showcase** - Detailed project pages with tech stacks and screenshots
- ⚡ **Fast Loading** - Server-side rendering with Next.js for optimal performance
- 🔍 **SEO Optimized** - Meta tags, structured data, and semantic HTML
- ♿ **Accessible** - Keyboard navigation, ARIA labels, and proper contrast
- 🌙 **Theme Persistence** - Your theme choice is saved across sessions

## How It Works

1. **Homepage** - Bento Grid with hero, about preview, featured projects, and theme switcher
2. **Projects Page** - Grid of all projects with filtering by category
3. **Individual Project Pages** - Detailed breakdowns with screenshots and tech stacks
4. **About Page** - Professional background, skills, work experience, and interests
5. **Contact Page** - Simple form that sends emails via Resend API

## Tech Stack

- **Framework**: Next.js 15.5.7 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4 + Custom CSS Grid
- **Email**: Resend API 6.0.2
- **Icons**: Lucide React + Simple Icons
- **Notifications**: React Hot Toast
- **Deployment**: Vercel

## The Bento Grid Challenge

Building a Bento Grid layout is harder than it looks. You're essentially creating a jigsaw puzzle with CSS Grid where:

- Each card needs to span different numbers of columns/rows
- The layout needs to reflow responsively on mobile
- Cards need to maintain visual balance without feeling random
- Everything needs to align properly despite different sizes

I spent hours in Chrome DevTools tweaking `grid-template-columns`, `grid-column`, and `grid-row` values. The result? A homepage that looks cohesive but never boring. Each card has its own personality while fitting into the larger design.

## Why I Rebuilt It

This portfolio served me well, but I eventually rebuilt it from scratch (v5 - the one you're viewing now) because:

- I wanted to explore a different design direction (more Japanese-inspired, wabi-sabi aesthetic)
- I learned new techniques and wanted to apply them
- The codebase had grown organically and needed a fresh start
- I wanted to integrate Supabase for dynamic content management
- Portfolios should evolve as you grow as a developer

But this version will always hold a special place - it was the first portfolio I built that truly felt like mine.

## Design Decisions

**Why Bento Grid?**

- Breaks away from traditional portfolio layouts
- Creates visual interest without overwhelming
- Flexible and responsive
- Challenging to build (which makes it fun)

**Why Multiple Themes?**

- Everyone has different preferences
- Shows attention to detail
- Demonstrates CSS variable mastery
- Makes the site feel more personal

**Why Next.js App Router?**

- Server-side rendering for better SEO
- File-based routing for clean URLs
- API routes for contact form
- Optimal performance out of the box

## What I Learned

This project taught me:

- **CSS Grid Mastery**: Complex grid layouts with asymmetric cards and responsive reflow
- **Next.js App Router**: Modern Next.js patterns, server components, and API routes
- **Design Systems**: Creating cohesive visual language with theme systems
- **TypeScript**: Type-safe React development at scale
- **Performance**: Server-side rendering, image optimization, and bundle size management
- **Responsive Design**: Making complex layouts work on all screen sizes

Building a portfolio is different from building other projects. It's not just about functionality - it's about showcasing your taste, your attention to detail, and your ability to create something that feels uniquely yours.

## The Evolution

This was v4. Before this, I had three other portfolio iterations:

- **v1**: Basic HTML/CSS (we all start somewhere)
- **v2**: React with Bootstrap (learning React)
- **v3**: Next.js with traditional layout (getting serious)
- **v4**: This one - Bento Grid, multiple themes, full-featured
- **v5**: The one you're viewing now - Japanese-inspired, Supabase-powered, completely rebuilt

Each version taught me something new. Each version was "the best one yet" until I learned enough to see its flaws and rebuild it better.

That's the beauty of portfolios - they're never finished. They evolve as you do.

---

Made with ☕ by [Ashwin](https://github.com/yourusername) during late nights and weekends.
