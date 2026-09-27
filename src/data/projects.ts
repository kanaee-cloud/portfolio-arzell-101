import type { Project } from '../types';

export const projects: Project[] = [
  {
    name: "Hioto - Smart Home Automation",
    description:
      "A comprehensive, full-stack Internet of Things (IoT) platform designed for home automation. It features a Go-based Microservice Worker (Backend) built with the Fiber framework and a cross-platform Flutter mobile application utilizing Stacked Architecture. The system leverages RabbitMQ for real-time device control and telemetry via MQTT, SQLite for high-speed local data persistence, and an embedded custom rules engine for automated device interactions based on sensory inputs.",
    url: "https://lskk.co.id/hioto/",
    periode: "2026",
    img: "/assets/hioto.png",
    gallery: ["/assets/hioto-1.png", "/assets/hioto-2.png", "/assets/hioto-3.png", "/assets/hioto-4.png"],
    frameworks: ["Golang", "Fiber", "Flutter", "RabbitMQ", "SQLite"],
  },
  {
    name: "Smart Traffic CCTV Detection System",
    description:
      "A highly scalable, microservices-based Real-Time Traffic Computer Vision System designed for smart city infrastructure. Orchestrates live CCTV video ingestion through a YOLOv8 object detection pipeline to identify vehicles and read license plates via ANPR. Features spatial-temporal deduplication and leverages NestJS backend with RabbitMQ for event-driven processing.",
    url: "#",
    periode: "2026",
    img: "/assets/traffic-cctv-1.png",
    gallery: ["/assets/traffic-cctv-1.png", "/assets/traffic-cctv-2.png", "/assets/traffic-cctv-3.png"],
    frameworks: ["Python", "Node.js", "NestJS", "React.js", "YOLOv8", "RabbitMQ", "MongoDB"],
  },
  {
    name: "Forest Monitoring Dashboard",
    description:
      "A modern, responsive web application serving as the frontend for a comprehensive Smart Farming and environmental monitoring ecosystem. Tailored for wide-area outdoor forestry management, enabling rangers to track real-time telemetry from weather stations and soil moisture sensors with interactive geospatial mapping.",
    url: "https://forestmonitoring.smartsystem.id/#/login",
    periode: "2026",
    img: "/assets/forestmon-1.jpg",
    gallery: ["/assets/forestmon-1.jpg", "/assets/forestmon-2.png"],
    frameworks: ["React.js", "NestJS", "Vite", "TypeScript", "Tailwind", "Zustand", "React Query"],
  },
  {
    name: "Akuprim",
    description:
      "Contributed as a Front-end Developer in building Akuprim, an innovative online platform designed to streamline and automate tax payment processes. This application significantly helps tax consultants save valuable time, organize client documents, and reduce the risk of human error.",
    url: "https://gitlab.com/teknikal/aku-prima.git",
    periode: "July 2024 - August 2024",
    img: "/assets/aku-prima.jpg",
    gallery: ["/assets/aku-prima.jpg", "/assets/portfolio-img1.jpg", "/assets/portfolio-img2.jpg"],
    frameworks: ["Laravel", "MySQL", "Tailwind", "Font Awesome"],
  },
  {
    name: "Web Assessment",
    description:
      "Developed a comprehensive online assessment platform aimed at modernizing the corporate employee recruitment process. Provides a secure environment for conducting tests and evaluations, offering automated scoring and detailed analytical reports.",
    url: "https://gitlab.com/teknikal/web-assessment.git",
    periode: "August 2024 - September 2024",
    img: "/assets/web-assessment.png",
    gallery: ["/assets/web-assessment.png", "/assets/portfolio-img3.jpg"],
    frameworks: ["Laravel", "Bootstrap", "Vanilla JS", "Excel JS", "PostgreSQL"],
  },
  {
    name: "ORBIT",
    description:
      "Took full responsibility for the Front-End development of a Learning Management System (LMS) website for the ORBIT extracurricular program. Created an engaging, user-friendly, and fully responsive educational platform for students to access learning materials and track progress.",
    url: "https://github.com/orbit4it/web-frontend.git",
    periode: "June 2023 - September 2023",
    img: "/assets/orbit.jpg",
    gallery: ["/assets/orbit.jpg", "/assets/portfolio-img1.jpg"],
    frameworks: ["Next.js", "TypeScript", "Python", "Tailwind", "PostgreSQL", "Fast API"],
  },
  {
    name: "Deskify",
    description:
      "Contributed as a Full-Stack Developer on Deskify, an e-commerce web platform dedicated to providing curated laptop components and productivity tools. Involved in the entire software development lifecycle from database architecture to user interface.",
    url: "https://deskify-seven.vercel.app",
    periode: "November 2023 - January 2024",
    img: "/assets/deskify.png",
    gallery: ["/assets/deskify.png", "/assets/portfolio-img2.jpg", "/assets/portfolio-img3.jpg"],
    frameworks: ["React.js", "JavaScript", "Tailwind", "Firebase", "Axios"],
  },
  {
    name: "SEA Catering",
    description:
      "Developed a dedicated business website for SEA Catering, a service provider catering to special events and corporate functions. Meticulously designed to present a comprehensive overview of menu offerings, pricing, and customizable service packages.",
    url: "https://seacatering-fe.vercel.app",
    periode: "June 2025",
    img: "/assets/sea.png",
    gallery: ["/assets/sea.png", "/assets/portfolio-img1.jpg"],
    frameworks: ["React.js", "TypeScript", "Tailwind", "MySQL", "Axios"],
  },
];
