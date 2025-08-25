export const projects = [
  {
    "id": "frames-by-ashwin",
    "title": "Frames by Ashwin",
    "subTitle": "A full stack app I created as my personal photography portfolio.",
    "images": [
      {
        "src": "/projects/frames-by-ashwin/1.png",
        "alt": "Image 1",
        "id": 1
      },
      {
        "src": "/projects/frames-by-ashwin/2.jpg",
        "alt": "Image 2",
        "id": 2
      },
      {
        "src": "/projects/frames-by-ashwin/3.jpg",
        "alt": "Image 3",
        "id": 3
      },
      {
        "src": "/projects/frames-by-ashwin/4.jpg",
        "alt": "Image 4",
        "id": 4
      },
      {
        "src": "/projects/frames-by-ashwin/5.jpg",
        "alt": "Image 5",
        "id": 5
      }
    ],
    "description": "Frames by Ashwin is my personal photography portfolio. I wanted a place on the web to show my photos; not just dump them somewhere, but actually curate and organize them. So I built my own app. It’s a simple idea: I can log in, upload images, create albums, and manage everything myself. Visitors get a clean gallery experience that works great on mobile and desktop. Behind the scenes, it’s all custom; just how I like it. This project let me combine two things I enjoy: building with code and capturing moments with a camera.",
    "link": "https://frames-by-ashwin.onrender.com/",
    "github": "https://github.com/ashwnkumar?tab=repositories&q=frames-by-ashwin",
    "stack": [
      "ReactJS",
      "MongoDB",
      "ExpressJS",
      "NodeJS",
      "TailwindCSS",
      "Multer",
      "Axios",
      "Cloudinary",
      "Render"
    ],
    "features": [
      "Secure admin dashboard protected via JWT authentication for managing content.",
      "Image uploads handled via Multer and stored on Cloudinary.",
      "Separation of standalone photos and curated albums for a cleaner browsing experience.",
      "Responsive layout with mobile-first design using TailwindCSS.",
      "Minimalist, distraction-free UI design that highlights photographic content.",
      "Hosted on Render with a Node/Express backend and MongoDB Atlas."
    ]
  },
  {
    "id": "idbfiles",
    "title": "IDBFiles",
    "subTitle": "A file manager app built into your browser",
    "images": [
      {
        "src": "/projects/idbfiles/1.png",
        "alt": "Image 1",
        "id": 1
      }
    ],
    "description": "This project came out of a rabbit hole. I stumbled on IndexedDB while messing around with browser storage options, and was surprised by how powerful it actually is. So I built IDBFiles; a file manager that works entirely in your browser. You can upload, preview, and download files without ever hitting a server. It’s all local, persistent, and private. Everything runs client-side, and your files stick around until you decide to delete them or clear browser data.",
    "link": "https://idbfiles.web.app/",
    "github": "https://github.com/ashwnkumar?tab=repositories&q=idbfiles",
    "stack": ["IndexedDB", "ReactJS", "JavaScript", "TailwindCSS", "Firebase"],
    "features": [
      "Client-side file storage using IndexedDB; no backend or cloud needed.",
      "Upload, preview, download, and delete files directly in the browser.",
      "No network calls or external APIs; everything stays local.",
      "Persistent local storage; files remain saved across sessions.",
      "Fast, lightweight interface built for speed and simplicity.",
      "Works offline after initial load; fully browser-contained."
    ]
  },
  {
    "id": "ashwinkumar-dev",
    "title": "Developer Portfolio",
    "subTitle": "The current version of my developer portfolio.",
    "images": [
      {
        "src": "/projects/ashwinkumar-dev/1.png",
        "alt": "Image 1",
        "id": 1
      }
    ],
    "description": "The website you're currently on. I was bored by how the previous iteration of my portfolio website looked. Just another generic design that looked like every other template. So I decided to revamp the whole thing from the ground up. Ditched the traditional portfolio design and opted for a design style that always fascinated me - The Bento Grid. I love the jigsaw-puzzle type feel it has and the way it makes the elements look like they're part of a whole. Exactly what you'd want from a portfolio website. So I decided to leverage CSS's Grid System and HOURS of tweaking the layout to make everything fit in place. The result is a responsive and clean portfolio website that's easy to navigate and looks great on all devices.",
    "github": "https://www.github.com/ashwnkumar",
    "stack": ["ReactJS", "JavaScript", "TailwindCSS", "Firebase"],
    "features": [
      "Responsive Bento Grid inspired UI using CSS Grid",
      "Fully custom design built from scratch (no templates)",
      "Suports multiple themes and color schemes",
      "Mobile-first design and adaptive layout tweaks"
    ]
  }
]