# 🚜 Construction Fleet Management System

> A comprehensive frontend for managing construction vehicle fleets, drivers, and operations

## The Problem I Was Solving

Managing a construction fleet is chaos. You've got vehicles scattered across job sites, drivers with different schedules, maintenance windows to track, bookings to coordinate, and financial records to maintain. Most fleet management software is either too expensive, too complicated, or both.

I wanted to build something that could handle all of this complexity with a clean, intuitive interface - a production-ready frontend that could plug into any backend API and just work.

## What Makes It Different?

**Complete Feature Set**: This isn't a toy project. It's a full-featured fleet management system with everything you'd need in production - vehicle tracking, driver management, bookings, service history, financial tracking, insurance management, and more.

**Production-Ready UI**: Built with real-world use cases in mind. Every screen, every interaction, every data table is designed for actual daily use by fleet managers and operations teams.

**Backend-Agnostic**: The entire frontend is built with mock data and a clean service layer, ready to connect to any REST API. Swap out the mock data, plug in your endpoints, and you're live.

## Features

## Features

- 📊 **Comprehensive Dashboard** - Real-time stats, charts, and KPIs at a glance
- 🚗 **Vehicle Management** - Track status, availability, utilization, and maintenance
- 👷 **Driver Management** - Profiles, availability, performance, and certifications
- 👥 **Customer Management** - Client profiles, booking history, and payment records
- 📅 **Booking System** - Create, assign, and track vehicle rentals
- 🔧 **Service History** - Maintenance records, schedules, and cost tracking
- 💰 **Financial Tracking** - Income, expenses, reports, and profit/loss analytics
- 🛡️ **Insurance Management** - Policy details, expiration alerts, and claims
- 💳 **Payment Management** - Transaction records, invoices, and payment history
- 👤 **User Management** - Roles, permissions, and access control
- 🌙 **Dark Mode** - Modern dark theme throughout
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 📈 **Interactive Charts** - Data visualization with Recharts
- 🔔 **Toast Notifications** - Real-time feedback for all actions
- ✅ **Form Validation** - Client-side validation on all forms

## How It Works

1. **Sign up** with email verification (OTP flow)
2. **Dashboard overview** - See fleet status, driver availability, and financials
3. **Add vehicles** - Register your fleet with details and status
4. **Manage drivers** - Add driver profiles with licenses and availability
5. **Create bookings** - Assign vehicles to customers with dates and rates
6. **Track maintenance** - Log service history and schedule upcoming maintenance
7. **Monitor finances** - Track income, expenses, and generate reports
8. **Manage insurance** - Keep policy details and get expiration alerts

## Tech Stack

- **Framework**: React 19.0.0
- **Build Tool**: Vite 6.2.0
- **Routing**: React Router DOM 7.3.0
- **Styling**: TailwindCSS 4.0.14
- **Charts**: Recharts 2.15.1
- **Icons**: Lucide React + Tabler Icons
- **Notifications**: React Hot Toast 2.5.2
- **Data**: Mock data (ready for API integration)

## Backend Integration

This frontend is designed to work with any REST API backend:

1. Create API service files in `src/services/`
2. Replace mock data in `src/constants/` with API calls
3. Add environment variables for API endpoints
4. Implement authentication token management
5. Add error handling and loading states

The entire service layer is abstracted and ready to plug into your backend of choice.

## Authentication Flow

Complete auth flow with OTP verification:

- Welcome page → Registration → Email verification (OTP)
- Login → Forgot password → Password reset (OTP)
- Protected routes with role-based access control

## Why This Project?

I wanted to build something that felt real - not just another todo app or weather widget. Fleet management is complex, and building a production-ready UI for it taught me about handling real-world data complexity, user workflows, and enterprise-level application architecture.

---

Made with ☕ by [Ashwin](https://github.com/yourusername) for fleet managers who deserve better tools.
