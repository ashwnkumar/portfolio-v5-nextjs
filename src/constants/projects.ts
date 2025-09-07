export interface ProjectImage {
  src: string;
  alt: string;
  id: number;
}

export type Project = {
  id: string;
  title: string;
  subTitle: string;
  images: {
    src: string;
    alt: string;
    id: number;
  }[];
  description: string;
  links?: {
    name: string;
    url: string;
  }[];
  stack: string[];
  features: string[];
};

export const projects: Project[] = [
  {
    id: "hiten-enterprises",
    title: "Hiten Enterprises",
    subTitle:
      "A commercial website for a sheet metal fabrication company, blending clean UI design with Google Sheets as a lightweight CMS.",
    images: [
      {
        src: "/projects/hiten-enterprises/1.jpg",
        alt: "Hiten Enterprises-1",
        id: 1,
      },
      {
        src: "/projects/hiten-enterprises/2.jpg",
        alt: "Hiten Enterprises-2",
        id: 2,
      },
      {
        src: "/projects/hiten-enterprises/3.jpg",
        alt: "Hiten Enterprises-3",
        id: 3,
      },
      {
        src: "/projects/hiten-enterprises/4.jpg",
        alt: "Hiten Enterprises-Figma Mockup",
        id: 4,
      },
      {
        src: "/projects/hiten-enterprises/5.jpg",
        alt: "Hiten Enterprises-Logo Variations",
        id: 5,
      },
      {
        src: "/projects/hiten-enterprises/6.jpg",
        alt: "Hiten Enterprises-Mobile Responsive Design",
        id: 6,
      },
    ],
    description:
      "I designed and developed a full-featured business website for Hiten Enterprises, a sheet metal fabrication company with over 30 years of experience. The site needed to showcase a diverse range of industrial products — from rolling shutters and high-speed doors to mezzanine floors and storage racks — while communicating the company’s credibility and service-first approach. To keep things simple and cost-effective, I implemented Google Sheets as a headless CMS: product and service data is stored in a sheet, fetched via the Sheets API, and served to the frontend as JSON. Images hosted on Google Drive are automatically converted into web-friendly `lh3.googleusercontent.com` links, ensuring smooth rendering across the site. Alongside this dynamic data logic, I designed an About page with mission, vision, and trust-building elements, plus a product image carousel. The result is a professional, responsive, and easy-to-maintain online presence that the client can update without touching code.",
    links: [{ name: "Live Link", url: "https://www.hitenenterprises.in/" }],
    stack: [
      "ReactJS",
      "TailwindCSS",
      "Google Sheets API",
      "Google Drive",
      "JavaScript",
      "Render",
    ],
    features: [
      "Clean, responsive business website designed to highlight services and product portfolio.",
      "Google Sheets-powered CMS: client updates product and service data directly in a spreadsheet.",
      "Automatic conversion of Google Drive image links into `lh3.googleusercontent.com` format for rendering.",
      "Dynamic About page featuring mission, vision, and trust-focused content.",
      "Custom image carousel pulling live product photos from Google Sheets data.",
      "Professional design system with consistent typography, branding, and responsive layouts.",
      "Low-maintenance and cost-effective solution without traditional backend overhead.",
    ],
  },
  {
    id: "frames-by-ashwin",
    title: "Frames by Ashwin",
    subTitle:
      "A full stack app I created as my personal photography portfolio.",
    images: [
      {
        src: "/projects/frames-by-ashwin/1.jpg",
        alt: "Frames By Ashwin",
        id: 1,
      },
      {
        src: "/projects/frames-by-ashwin/2.jpg",
        alt: "Frames By Ashwin",
        id: 2,
      },
      {
        src: "/projects/frames-by-ashwin/3.jpg",
        alt: "Frames By Ashwin",
        id: 3,
      },
    ],
    description:
      "Frames by Ashwin is my personal photography portfolio. I wanted a place on the web to show my photos; not just dump them somewhere, but actually curate and organize them. So I built my own app. It’s a simple idea: I can log in, upload images, create albums, and manage everything myself. Visitors get a clean gallery experience that works great on mobile and desktop. Behind the scenes, it’s all custom; just how I like it. This project let me combine two things I enjoy: building with code and capturing moments with a camera.",
    links: [
      { name: "Live Link", url: "https://frames-by-ashwin.onrender.com/" },
      {
        name: "GitHub Repo",
        url: "https://github.com/ashwnkumar?tab=repositories&q=frames-by-ashwin",
      },
    ],
    stack: [
      "ReactJS",
      "MongoDB",
      "ExpressJS",
      "NodeJS",
      "TailwindCSS",
      "Multer",
      "Axios",
      "Cloudinary",
      "Render",
    ],
    features: [
      "Secure admin dashboard protected via JWT authentication for managing content.",
      "Image uploads handled via Multer and stored on Cloudinary.",
      "Separation of standalone photos and curated albums for a cleaner browsing experience.",
      "Responsive layout with mobile-first design using TailwindCSS.",
      "Minimalist, distraction-free UI design that highlights photographic content.",
      "Hosted on Render with a Node/Express backend and MongoDB Atlas.",
    ],
  },
  {
    id: "idbfiles",
    title: "IDBFiles",
    subTitle:
      "An offline file manager app built into your browser that leverages IndexedDB Storage.",
    images: [
      { src: "/projects/idbfiles/1.jpg", alt: "IDBFiles", id: 1 },
      { src: "/projects/idbfiles/2.jpg", alt: "IDBFiles", id: 2 },
      { src: "/projects/idbfiles/3.jpg", alt: "IDBFiles", id: 3 },
      { src: "/projects/idbfiles/4.jpg", alt: "IDBFiles", id: 3 },
    ],
    description:
      "This project came out of a rabbit hole. I stumbled on IndexedDB while messing around with browser storage options, and was surprised by how powerful it actually is. So I built IDBFiles; a file manager that works entirely in your browser. You can upload, preview, and download files without ever hitting a server. It’s all local, persistent, and private. Everything runs client-side, and your files stick around until you decide to delete them or clear browser data.",

    links: [
      { name: "Live Link", url: "https://idbfiles.web.app/" },
      {
        name: "GitHub Repo",
        url: "https://github.com/ashwnkumar?tab=repositories&q=idbfiles",
      },
    ],
    stack: ["IndexedDB", "ReactJS", "JavaScript", "TailwindCSS", "Firebase"],
    features: [
      "Client-side file storage using IndexedDB; no backend or cloud needed.",
      "Upload, preview, download, and delete files directly in the browser.",
      "No network calls or external APIs; everything stays local.",
      "Persistent local storage; files remain saved across sessions.",
      "Fast, lightweight interface built for speed and simplicity.",
      "Works offline after initial load; fully browser-contained.",
    ],
  },
  {
    id: "cmdtask",
    title: "CmdTask",
    subTitle:
      "A minimalist, terminal-style to-do app built for developers and keyboard-first users.",
    images: [
      { src: "/projects/cmdtask/1.jpg", alt: "CmdTask", id: 1 },
      { src: "/projects/cmdtask/2.jpg", alt: "CmdTask", id: 2 },
      { src: "/projects/cmdtask/3.jpg", alt: "CmdTask", id: 3 },
      { src: "/projects/cmdtask/4.jpg", alt: "CmdTask", id: 4 },
      { src: "/projects/cmdtask/5.jpg", alt: "CmdTask", id: 5 },
    ],
    description:
      "CmdTask is a personal task manager designed with a command-line inspired interface. Instead of buttons and menus, it’s fully keyboard-driven — every action happens through typed commands. Tasks are stored locally using the browser’s IndexedDB, which means your data persists across sessions without relying on any server or cloud service. You can add tasks with priority levels, list and filter them, mark them as done, or purge everything entirely — all with a few keystrokes. CmdTask combines productivity with a terminal aesthetic, making it fast, efficient, and distraction-free.",
    links: [
      { name: "Live Link", url: "https://cmd-task.web.app/" },
      {
        name: "GitHub Repo",
        url: "https://github.com/ashwnkumar?tab=repositories&q=cmdtask",
      },
    ],
    stack: ["ReactJS", "IndexedDB", "HTML", "JavaScript", "CSS", "TailwindCSS"],
    features: [
      "Keyboard-native navigation with a terminal-inspired interface — no mouse required.",
      "Persistent local storage of tasks using IndexedDB with no external server dependencies.",
      "Support for customizable task priority levels (high, medium, low).",
      "Command-based task management including add, list, delete, done, purge, and help.",
      "Lightweight, fast, and private — all data stays on the user’s device.",
      "Fun hidden commands (e.g., 'coffee', 'motivate', 'hack') for playful interactions.",
    ],
  },
  {
    id: "ashwinkumar-dev",
    title: "Developer Portfolio",
    subTitle: "The current version of my developer portfolio.",
    images: [
      {
        src: "/projects/ashwinkumar-dev/1.jpg",
        alt: "Ashwin Kumar Dev",
        id: 1,
      },
    ],
    description:
      "The website you're currently on. I was bored by how the previous iteration of my portfolio website looked. Just another generic design that looked like every other template. So I decided to revamp the whole thing from the ground up. Ditched the traditional portfolio design and opted for a design style that always fascinated me - The Bento Grid. I love the jigsaw-puzzle type feel it has and the way it makes the elements look like they're part of a whole. Exactly what you'd want from a portfolio website. So I decided to leverage CSS's Grid System and HOURS of tweaking the layout to make everything fit in place. The result is a responsive and clean portfolio website that's easy to navigate and looks great on all devices.",
    links: [{ name: "GitHub Repo", url: "https://www.github.com/ashwnkumar" }],
    stack: ["NextJS", "JavaScript", "TailwindCSS", "Firebase"],
    features: [
      "Responsive Bento Grid inspired UI using CSS Grid",
      "Fully custom design built from scratch (no templates)",
      "Suports multiple themes and color schemes",
      "Mobile-first design and adaptive layout tweaks",
      "Basically functions as my online resume",
    ],
  },
];
