import { Languages } from "lucide-react";
import {
  siArtstation,
  siBlender,
  siBootstrap,
  siCss,
  siExpress,
  siFigma,
  siHtml5,
  siInstagram,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPinterest,
  siReact,
  siTailwindcss,
  siTypescript,
  siX,
} from "simple-icons";

export const admin = {
  name: "Ashwin Kumar",
  email: "code.by.ashwin@gmail.com",
  links: {
    github: "https://github.com/ashwnkumar",
    linkedin: "https://www.linkedin.com/in/ashwin-kumar-221160240",
  },
  resume: "/resume.pdf",
  profile: "/assets/home.jpg",
  aboutProfile: "/assets/about.jpg",
  socialLinks: [
    {
      title: "Instagram",
      link: "https://www.instagram.com/ashwnkumar/",
      icon: siInstagram,
      color: "#FD006C",
    },
    {
      title: "X",
      link: "https://www.instagram.com/ashwnkumaar/",
      icon: siX,
      color: "#000000",
    },
    {
      title: "Pinterest",
      link: "https://www.pinterest.com/ashwnkumar07",
      icon: siPinterest,
      color: "#e70025",
    },
    {
      title: "ArtStation",
      link: "https://www.artstation.com/ashwnkumar/",
      icon: siArtstation,
      color: "#42A5F5",
    },
  ],
  aboutShort: `

  A Full Stack Web Developer,<span class="text-secondary"> specializing in 
  creating clean, user-focused web interfaces <span/> .
`,
  location: "Pune, Maharashtra, India",
  stack: [
    {
      title: "Frontend",
      skills: [
        { name: "ReactJS", icon: siReact },
        { name: "NextJS", icon: siNextdotjs },
        { name: "React Native", icon: siReact },
        { name: "JavaScript", icon: siJavascript },
        { name: "TypeScript", icon: siTypescript },
        { name: "HTML", icon: siHtml5 },
        { name: "CSS", icon: siCss },
        { name: "TailwindCSS", icon: siTailwindcss },
        { name: "Bootstrap", icon: siBootstrap },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "ExpressJS", icon: siExpress },
        { name: "MongoDB", icon: siMongodb },
        { name: "NodeJS", icon: siNodedotjs },
      ],
    },
    {
      title: "Other",
      skills: [
        { name: "Figma", icon: siFigma },
        { name: "Blender", icon: siBlender },
        { name: "Japanese", icon: Languages },
      ],
    },
  ],
  workExp: [
    {
  id: "neuralarc",
  company: "Neural Arc",
  position: "Full Stack AI Developer",
  from: "Jan 2026",
  work: [
    "Developing and maintaining web applications using modern full stack technologies.",
    "Working on the company’s AI-driven products, contributing across both frontend and backend systems.",
    "Building scalable features, integrating AI workflows, and ensuring smooth data flow between services.",
    "Managing and overseeing freshers, reviewing their work, and assisting them with implementation and problem-solving.",
    "Collaborating closely with product and engineering teams to ship reliable, production-ready solutions.",
  ],
  skills: [
    "ReactJS",
    "Next.js",
    "NodeJS",
    "JavaScript",
    "TypeScript",
    "Express.js",
    "TailwindCSS",
    "Database Design",
    "Team Mentorship",
  ],
},

    {
      id: "ndss",
      company: "NDSoftTech Solutions",
      position: "SDE - Trainee",
      from: "Jul 2025",
      to: "Dec 2025",
to: "Dec 2025",
      work: [
        "Developed user facing interfaces using React Native for multiple applications.",
        "Optimized codebase readability by introducing reusable components.",
        "Worked with backend database and transformed data in various way to fetch useful data from the backend.",
      ],
      skills: [
        "ReactJS",
        "NodeJS",
        "JavaScript",
        "Express.js",
        "MongoDB",
        "React Native",
        "TailwindCSS",
      ],
    },
    {
      id: "dreams",
      company: "Dreams International Pvt. Ltd.",
      position: "ReactJS Intern",
      from: "Nov 2024",
      to: "May 2025",
      work: [
        "Participated in end-to-end project development—from initial coding to final deployment—ensuring reliable performance in production environments.",
        "Developed numerous reusable React components to accelerate development and maintain a clean, scalable codebase.",
        "Took charge of complete UI redesigns for multiple projects, improving how they looked, felt, and performed.",
        "Worked closely with design teams and backend engineers to turn concepts into functional, polished web applications.",
      ],
      skills: ["ReactJS", "Axios", "JavaScript", "Figma", "TailwindCSS", "CSS"],
    },
  ],
  movies: [
    "GoodFellas",
    "The Irishman",
    "Wake Up Sid",
    "Zindagi Na Milegi Dobara",
    "Interstellar",
    "Dune",
    "The Dark Knight",
    "The Dark Knight Rises",
    "Limitless",
  ],
};
