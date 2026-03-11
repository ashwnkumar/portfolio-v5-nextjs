# 🎵 Trip Tunes

> A collaborative playlist app for road trips where everyone wants to be the DJ

## The Problem I Was Solving

You know that moment on a road trip when everyone's fighting over the aux cord? Someone's phone dies, someone else doesn't have Spotify Premium, and you end up listening to the same 10 songs on repeat for 6 hours.

I got tired of the chaos. Passing phones around while driving, losing track of who wanted to add what song, and dealing with the inevitable "wait, let me add just one more song" that derails the whole vibe.

So I built Trip Tunes - a collaborative playlist app where everyone can add songs from their own phone in real-time. No more aux cord fights, no more phone passing, just pure collaborative music vibes.

## What Makes It Different?

**Real-Time Collaboration**: Everyone sees updates instantly. Add a song, and it appears on everyone's screen immediately. Remove a song, and it's gone for everyone. It's like Google Docs, but for playlists.

**Spotify Integration**: Search from Spotify's massive library and add songs with one tap. No need to remember exact song names or artist spellings - just search and add.

**Room-Based System**: Create a room for your trip, share the link or QR code, and everyone joins. When the trip is over, delete the room. Simple, clean, no clutter.

## Features

- 🎵 **Spotify Integration** - Search and add songs from Spotify's massive library
- 🔴 **Real-Time Collaboration** - Everyone sees updates instantly via Supabase real-time
- 🚪 **Room System** - Create rooms with unique codes, share via link or QR code
- 👥 **Member Presence** - See who's online and active in the room
- 📋 **Live Playlist** - See what everyone's adding in real-time
- 🎨 **Album Art** - Beautiful album covers for every song
- 🚫 **Duplicate Prevention** - Can't add the same song twice
- 👑 **Admin Controls** - Room creator can manage playlist and members
- 🔔 **Toast Notifications** - Get notified when songs are added or removed
- 📱 **Fully Responsive** - Works seamlessly on mobile (where you need it most)
- 💾 **Persistent Storage** - Rooms and playlists are saved in Supabase

## How It Works

1. **Create a room** for your road trip
2. **Share the link or QR code** with your friends
3. **Everyone joins** from their own phone
4. **Search for songs** using Spotify's API
5. **Add songs** with one tap - they appear instantly for everyone
6. **See who added what** with member attribution
7. **Admin manages** the playlist (remove songs, kick members if needed)
8. **Delete the room** when the trip is over

## Tech Stack

- **Framework**: Next.js 15.5.5 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4
- **Backend**: Supabase (PostgreSQL + Real-time subscriptions)
- **Music API**: Spotify Web API
- **UI Components**: Radix UI (Dialog, Dropdown, Alert Dialog)
- **Notifications**: Sonner (toast notifications)
- **Icons**: Lucide React
- **QR Codes**: QRCode.react
- **Local Storage**: Dexie (IndexedDB wrapper)

## Real-Time Magic

Trip Tunes uses Supabase's real-time subscriptions to keep everything in sync:

- **Playlist Updates**: New songs appear instantly for everyone
- **Member Presence**: See who's online in real-time
- **Room Deletions**: Everyone gets kicked if admin deletes the room
- **Song Removals**: Updates propagate immediately across all devices

No polling, no refresh button - just pure real-time collaboration.

## Limitations

- **No Playback**: This is a playlist builder, not a music player (Spotify API restrictions)
- **Internet Required**: Need connection for real-time updates and Spotify search
- **Spotify Account**: Need Spotify account for search (free tier works)

## What I Learned

This project taught me:

- **Real-Time Subscriptions**: Working with Supabase real-time features at scale
- **Spotify API**: Integrating third-party music APIs with OAuth
- **Collaborative Features**: Building multi-user experiences with presence tracking
- **Next.js App Router**: Modern Next.js patterns and server components
- **State Management**: Managing complex real-time state across multiple users
- **Mobile-First Design**: Designing for group interactions on mobile devices

Building a real-time collaborative app is different from building a solo app. You have to think about race conditions, presence tracking, and what happens when someone's internet drops mid-session.

---

Made with ☕ by [Ashwin](https://github.com/yourusername) for road trippers who deserve better playlists.
