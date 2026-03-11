# 📁 IDBFiles

> A browser-based file manager built with IndexedDB

## The Problem I Was Solving

I was learning about IndexedDB and realized most tutorials only show you how to store JSON data. But IndexedDB can store Blobs - entire files - and they persist even after you close the browser. That's actually pretty powerful.

So I thought: what if I built a file manager that runs entirely in the browser? No backend, no cloud storage, no servers. Just pure client-side storage using browser APIs.

This project was my playground for understanding how IndexedDB really works beyond the basics.

## What Makes It Different?

**Completely Offline**: No server, no cloud, no internet required. Everything lives in your browser's IndexedDB. Upload a file, close the browser, come back a week later - it's still there.

**File Preview Support**: Not just storage - you can preview images, PDFs, videos, audio, and text files directly in the browser. It's a real file manager, not just a storage demo.

**Educational**: This project taught me about browser storage quotas, Blob handling, Object URLs, MIME types, and the practical limits of client-side storage. It's a learning project that actually works.

## Features

- 📤 **File Upload** - Upload any file type (up to 100MB per file)
- 💾 **IndexedDB Storage** - Files stored locally in your browser
- 👁️ **File Preview** - View images, PDFs, videos, audio, and text files in-browser
- 📥 **File Download** - Download your stored files anytime
- 🗑️ **File Management** - Delete individual files or clear all storage
- 📊 **Storage Monitoring** - Real-time tracking of browser storage usage
- 🔒 **Persistent Storage** - Files remain even after closing the browser
- 🌙 **Dark Mode** - Easy on the eyes
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🔔 **Toast Notifications** - Real-time feedback for all actions

## Supported File Types

- **Images**: JPG, PNG, GIF, SVG
- **Documents**: PDF
- **Videos**: MP4 and other browser-supported formats
- **Audio**: MP3 and other browser-supported formats
- **Text**: TXT, JSON, and other text-based files

## How It Works

1. **Upload a file** (up to 100MB)
2. **File is stored** as a Blob in IndexedDB
3. **Preview supported files** (images, PDFs, videos, audio, text)
4. **Download anytime** by creating a download link from the Blob
5. **Delete files** individually or clear all storage
6. **Monitor storage** usage in real-time

## Tech Stack

- **Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.0
- **Styling**: TailwindCSS 4.1.11
- **Icons**: Lucide React 0.523.0
- **Storage**: IndexedDB (browser API)

## Browser Storage Limits

Different browsers have different storage quotas:

- **Chrome/Edge**: Up to 10-50% of available disk space
- **Firefox**: Up to 10-50% of available disk space
- **Safari**: Typically 50MB-200MB (more restrictive)
- **Mobile Browsers**: Generally 50MB-200MB

The app displays real-time storage usage and provides educational information about these limits.

## Limitations

- **File Size**: Maximum 100MB per file
- **Storage Quota**: Limited by browser storage limits
- **Browser-Specific**: Files are tied to the browser and device
- **No Sync**: Files don't sync across devices or browsers
- **Data Loss**: Clearing browser data will delete all files
- **No Encryption**: Files are stored unencrypted in the browser

## What I Learned

This project taught me:

- **IndexedDB API**: How to work with browser databases beyond localStorage
- **Blob Handling**: Storing and retrieving binary data in the browser
- **Object URLs**: Creating temporary URLs for file previews
- **Storage Quotas**: Understanding browser storage limitations and how they vary
- **File Type Detection**: Working with MIME types and file extensions
- **Async Operations**: Managing promises and async/await with IndexedDB
- **Error Handling**: Gracefully handling storage errors and quota limits

It's a simple project, but it taught me a lot about what browsers can actually do without a backend.

---

Made with ☕ by [Ashwin](https://github.com/yourusername) because I wanted to learn IndexedDB properly.
