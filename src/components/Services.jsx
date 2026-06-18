import { useState } from "react";
import { motion } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";
import { staggerContainer, scaleIn } from "../variants";
import { GoProjectRoadmap } from "react-icons/go";
import Badge from "./Badges/Badge";
import Modal from "./Modal";

const services = [
  {
    name: "Hioto - Smart Home Automation",
    description:
      "A comprehensive, full-stack Internet of Things (IoT) platform designed for home automation. It features a Go-based Microservice Worker (Backend) built with the Fiber framework and a cross-platform Flutter mobile application utilizing Stacked Architecture. The system leverages RabbitMQ for real-time device control and telemetry via MQTT, SQLite for high-speed local data persistence, and an embedded custom rules engine for automated device interactions based on sensory inputs.",
    url: "https://lskk.co.id/hioto/",
    periode: "2026",
    img: "/assets/hioto.png",
    gallery: ["/assets/hioto-1.png", "/assets/hioto-2.png", "/assets/hioto-3.png", "/assets/hioto-4.png"],
    frameworks: [
      "Golang",
      "Fiber",
      "Flutter",
      "RabbitMQ",
      "SQLite"
    ],
  },
  {
    name: "Smart Traffic CCTV Detection System",
    description:
      "A highly scalable, microservices-based Real-Time Traffic Computer Vision System designed for smart city infrastructure. This advanced project seamlessly orchestrates live CCTV video ingestion and processes it through a YOLOv8 object detection pipeline to identify vehicles and read license plates via ANPR. It features spatial-temporal deduplication to prevent double-counting and leverages a robust NestJS backend with RabbitMQ for event-driven processing, ultimately broadcasting real-time analytics and live monitoring feeds to a modern, interactive web dashboard.",
    url: "#",
    periode: "2026",
    img: "/assets/traffic-cctv-1.png",
    gallery: ["/assets/traffic-cctv-1.png", "/assets/traffic-cctv-2.png", "/assets/traffic-cctv-3.png"],
    frameworks: [
      "Python",
      "Node.js",
      "NestJS",
      "React.js",
      "YOLOv8",
      "RabbitMQ",
      "MongoDB"
    ],
  },
  {
    name: "Forest Monitoring Dashboard",
    description:
      "A modern, responsive web application serving as the frontend interface for a comprehensive Smart Farming and environmental monitoring ecosystem. Specifically tailored for wide-area outdoor forestry management, this dashboard empowers rangers and administrators to track real-time telemetry from weather stations and soil moisture sensors. It features interactive geospatial mapping, role-based access control, and an automation rules engine that can trigger outdoor actuators via MQTT, enabling proactive anomaly detection and rapid response to potential forest fires.",
    url: "https://forestmonitoring.smartsystem.id/#/login",
    periode: "2026",
    img: "/assets/forestmon-1.jpg",
    gallery: ["/assets/forestmon-1.jpg", "/assets/forestmon-2.png"],
    frameworks: [
      "React.js",
      "NestJS",
      "Vite",
      "TypeScript",
      "Tailwind",
      "Zustand",
      "React Query"
    ],
  },
  {
    name: "Akuprim",
    description:
      "Contributed as a Front-end Developer in building Akuprim, an innovative online platform designed to streamline and automate tax payment processes. This application significantly helps tax consultants save valuable time, organize client documents, and drastically reduce the risk of human error during complex tax calculations and submissions by providing a clean, intuitive, and highly responsive user interface.",
    url: "https://gitlab.com/teknikal/aku-prima.git",
    periode: "July 2024 - August 2024",
    img: "/assets/aku-prima.jpg",
    gallery: ["/assets/aku-prima.jpg", "/assets/portfolio-img1.jpg", "/assets/portfolio-img2.jpg"],
    frameworks: ["Laravel", "MySQL", "Tailwind", "Font Awesome"],
  },
  {
    name: "Web Assessment",
    description:
      "Developed a comprehensive online assessment platform aimed at modernizing and facilitating the corporate employee recruitment process. This system provides a secure environment for conducting various tests and evaluations, offering automated scoring and detailed analytical reports to assist HR departments in accurately identifying and selecting the most qualified candidates for their organizations.",
    url: "https://gitlab.com/teknikal/web-assessment.git",
    periode: "August 2024 - September 2024",
    img: "/assets/web-assessment.png",
    gallery: ["/assets/web-assessment.png", "/assets/portfolio-img3.jpg"],
    frameworks: [
      "Laravel",
      "Bootstrap",
      "Vanilla JS",
      "Excel JS",
      "PostgreSQL",
    ],
  },
  {
    name: "ORBIT",
    description:
      "Took full responsibility for the Front-End development of a Learning Management System (LMS) website for the ORBIT extracurricular program. Focused heavily on creating an engaging, user-friendly, and fully responsive educational platform that allows students to easily access learning materials, track their academic progress, and interact with dynamic content, ensuring a seamless learning experience across all devices.",
    url: "https://github.com/orbit4it/web-frontend.git",
    periode: "June 2023 - September 2023",
    img: "/assets/orbit.jpg",
    gallery: ["/assets/orbit.jpg", "/assets/portfolio-img1.jpg"],
    frameworks: [
      "Next.js",
      "TypeScript",
      "Python",
      "Tailwind",
      "PostgreSQL",
      "Fast API",
    ],
  },
  {
    name: "Deskify",
    description:
      "Contributed as a Full-Stack Developer on Deskify, an e-commerce web platform dedicated to providing curated laptop components and productivity tools packaged for online purchase. Actively involved in the entire software development lifecycle—from designing the database architecture and implementing secure API endpoints, to crafting a highly functional, informative, and visually appealing user interface that enhances the overall shopping experience.",
    url: "https://deskify-seven.vercel.app",
    periode: "November 2023 - January 2024",
    img: "/assets/deskify.png",
    gallery: ["/assets/deskify.png", "/assets/portfolio-img2.jpg", "/assets/portfolio-img3.jpg"],
    frameworks: [
      "React.js",
      "JavaScript",
      "Tailwind",
      "Firebase",
      "Axios",
    ],
  },
  {
    name: "SEA Catering",
    description:
      "Developed a dedicated business website for SEA Catering, a service provider catering to a wide variety of special events and corporate functions. The website was meticulously designed to present a comprehensive overview of their diverse menu offerings, transparent pricing structures, and customizable service packages, featuring a polished, appetizing aesthetic to attract potential clients and streamline their booking inquiries.",
    url: "https://seacatering-fe.vercel.app",
    periode: "June 2025",
    img: "/assets/sea.png",
    gallery: ["/assets/sea.png", "/assets/portfolio-img1.jpg"],
    frameworks: [
      "React.js",
      "TypeScript",
      "Tailwind",
      "MySQL",
      "Axios",
    ],
  },
];

const Services = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="work">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <h1 className="text-2xl mb-4 font-bold tracking-tight flex items-center gap-3">
          <div className="p-2 rounded-ios bg-ios-teal/15">
            <GoProjectRoadmap size={22} className="text-ios-teal" />
          </div>
          Projects
        </h1>
        <p className="text-[15px] text-label-secondary leading-relaxed">
          Some projects I have worked on.
        </p>
        <div className="ios-separator" />
      </motion.div>

      {/* Project Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid md:grid-cols-2 gap-5"
      >
        {services.map((service, index) => (
          <motion.div
            variants={scaleIn(index * 0.08)}
            key={index}
            className="ios-card overflow-hidden group cursor-pointer"
            onClick={() => openModal(service)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={service.img}
                alt={service.name}
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Floating Link */}
              <a
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-ios-blue hover:scale-110"
              >
                <BsArrowUpRight size={14} />
              </a>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[16px] font-semibold text-white">{service.name}</h3>
                <span className="text-[11px] text-label-tertiary font-medium">{service.periode}</span>
              </div>
              <p className="text-[13px] text-label-secondary leading-relaxed line-clamp-2 mb-3">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {service.frameworks.map((fw, i) => (
                  <Badge key={i} name={fw} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} data={selectedProject} />
    </section>
  );
};

export default Services;
