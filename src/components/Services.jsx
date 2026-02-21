import { useState } from "react";
import { motion } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";
import { staggerContainer, scaleIn } from "../variants";
import { GoProjectRoadmap } from "react-icons/go";
import Badge from "./Badges/Badge";
import Modal from "./Modal";

const services = [
  {
    name: "Akuprim",
    description:
      "Berkontribusi sebagai Front-end Developer pada pengembangan platform daring Akuprim yang menyederhanakan pembayaran pajak, membantu konsultan pajak menghemat waktu dan mengurangi risiko kesalahan.",
    url: "https://gitlab.com/teknikal/aku-prima.git",
    periode: "Juli 2024 - Agustus 2024",
    img: "/assets/aku-prima.jpg",
    frameworks: ["Laravel", "MySQL", "Tailwind", "Font Awesome"],
  },
  {
    name: "Web Assessment",
    description:
      "Membangun platform assessment daring untuk memfasilitasi proses rekrutmen karyawan dan identifikasi kandidat terbaik untuk perusahaan.",
    url: "https://gitlab.com/teknikal/web-assessment.git",
    periode: "Agustus 2024 - September 2024",
    img: "/assets/web-assessment.png",
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
      "Bertanggung jawab atas pengembangan situs web LMS untuk eskul Orbit dari sisi Front-End, memastikan tampilan yang menarik, user-friendly, dan responsif.",
    url: "https://github.com/orbit4it/web-frontend.git",
    periode: "Juni 2023 - September 2023",
    img: "/assets/orbit.jpg",
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
      "Berkontribusi sebagai fullstack developer dalam proyek pembuatan website yang bertujuan menyediakan komponen dan tools laptop dalam bentuk package secara online. Terlibat dalam berbagai tahapan pengembangan untuk menghasilkan platform yang fungsional dan informatif bagi pengguna.",
    url: "https://deskify-seven.vercel.app",
    periode: "November 2024 - January 2024",
    img: "/assets/deskify.png",
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
      "Membuat website SEA Catering yang menyediakan layanan catering untuk berbagai acara. Website ini dirancang untuk memberikan informasi lengkap tentang menu, harga, dan layanan yang ditawarkan.",
    url: "https://seacatering-fe.vercel.app",
    periode: "Juni 2025",
    img: "/assets/sea.png",
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
