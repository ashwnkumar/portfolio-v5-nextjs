# 🏭 Hiten Enterprises

> A professional business website for an industrial sheet metal fabrication company

## The Problem I Was Solving

My friend's family runs Hiten Enterprises, a sheet metal fabrication company in Pune that's been around since 1995. They had 30+ years of experience, 100+ employees, and 50+ completed projects - but no online presence. In 2024, that's a problem.

Potential customers couldn't find them on Google. They had no way to showcase their products. Every inquiry required a phone call or site visit. They were losing business to competitors with basic websites.

So I built them one. My first real client project - not a portfolio piece, not a side project, but actual production work for an actual business.

## What Makes It Different?

**SEO-First Approach**: This wasn't just about looking good. It needed to rank on Google for "rolling shutters Pune" and "industrial gates Maharashtra". Every page is optimized with proper meta tags, structured data, and semantic HTML.

**Content Management via Google Sheets**: The client isn't technical, so I built a system where they can update product information in a Google Sheet, and the site pulls it at build time. No CMS, no complicated admin panel - just a spreadsheet they already know how to use.

**Production-Ready**: This is a real business website serving real customers. Fast loading, mobile-optimized, professional design, and easy contact integration. No fluff, just what works.

## Features

- 📦 **8 Product Categories** - Rolling shutters, sliding gates, high-speed doors, fire-rated shutters, boom barriers, mezzanine floors, partitions, and storage racks
- 📄 **Dynamic Product Pages** - Individual pages with features, applications, and image galleries
- 📞 **Easy Contact** - Direct phone and email links for customer inquiries
- 🗺️ **Google Maps Integration** - Embedded location for easy navigation
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- 🔍 **SEO Optimized** - Meta tags, structured data, and sitemap for search visibility
- 📊 **Google Sheets CMS** - Client updates products via spreadsheet, site rebuilds automatically
- 🖼️ **Image Lightbox** - Full-screen product image viewer
- ✨ **Smooth Animations** - Intersection Observer for scroll-triggered effects
- ⚡ **Fast Loading** - Optimized images and code splitting

## How It Works

1. **Client updates Google Sheet** with product details (name, description, features, images)
2. **Build script fetches data** from Google Sheets API and saves to `products.json`
3. **React app reads** from `products.json` to display products
4. **Site deploys** with updated content - no code changes needed

This approach gives the client full control over content without needing to touch code or learn a CMS.

## Tech Stack

- **Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Routing**: React Router DOM 7.6.0
- **Styling**: TailwindCSS 4.1.7
- **Icons**: Lucide React 0.511.0
- **Animations**: React Intersection Observer 9.16.0
- **CMS**: Google Sheets API + Google Apps Script

## SEO Implementation

The site is built for search visibility:

- **Meta Tags** - Comprehensive title, description, and keywords for every page
- **Structured Data** - LocalBusiness schema for rich search results
- **Sitemap** - Auto-generated XML sitemap
- **Semantic HTML** - Proper heading hierarchy and semantic elements
- **Mobile-First** - Responsive design and viewport optimization
- **Fast Loading** - Optimized images and code splitting
- **Open Graph** - Social media sharing optimization

## What I Learned

This was my first real client project, and it taught me:

- **Client Communication** - Understanding business needs vs. technical wants
- **SEO Fundamentals** - Making a site discoverable, not just pretty
- **Content Management** - Building systems non-technical users can actually use
- **Production Deployment** - Delivering something that has to work, not just demo well
- **Real-World Constraints** - Budget, timeline, and client capabilities matter

Building for a real business with real customers is different from building portfolio projects. This one had to work.

---

Made with ☕ by [Ashwin](https://github.com/yourusername) for Hiten Enterprises, Pune.
