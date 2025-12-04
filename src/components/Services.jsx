// import React, { useState } from "react";
import { motion } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";
import { fadeIn } from "../variants";
import { GoProjectRoadmap } from "react-icons/go";
import Badge from "./Badges/Badge";


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
  // const [selectedService, setSelectedService] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = (service) => {
  //   setSelectedService(service);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <section id="work">
      <div>
        <h1 className="text-2xl mb-5 font-semibold flex items-center gap-x-2">
          <GoProjectRoadmap size={30} className="opacity-70" />
          Project
        </h1>
        <h2 className="text-[16px] text-justify opacity-70 font-light leading-relaxed">
          Some project i have worked.
        </h2>
        <hr className="opacity-30 my-5" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8">
        {services.map((service, index) => (
          <motion.div
            variants={fadeIn("up", 0.3 * index)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            key={index}
            // onClick={() => openModal(service)}
            className="group relative glassmorphism rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
          >
            <img
              src={service.img}
              alt={service.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <p className="text-sm opacity-70 mb-2">{service.periode}</p>
              <p className="text-sm text-justify opacity-80 line-clamp-3">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {service.frameworks.map((fw, i) => (
                  <Badge key={i} name={fw} />
                ))}
              </div>
              
              <div className="absolute top-4 right-4 bg-black text-white p-1 rounded-full group-hover:scale-110 transition">
                <a href={service.url}>
                  <BsArrowUpRight />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedService}
      /> */}
    </section>
  );
};

export default Services;
