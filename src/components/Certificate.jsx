import React, { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, scaleIn } from "../variants";
import { GiAchievement } from "react-icons/gi";
import Modal from "./Modal";

const certificate = [
  {
    name: "Certificate of Competence in Web Development",
    company: "Lembaga Sertifikasi Profesi Teknologi Digital",
    periode: "January 2025 - January 2028",
    img: "/assets/bnsp.png",
    description: "Professional competency certification in web development issued by the Digital Technology Professional Certification Body, valid for three years.",
  },
  {
    name: "Coding Camp by DBS Foundation",
    company: "DBS Foundation",
    periode: "May 2025",
    img: "/assets/dbs.png",
    description: "Completed an intensive coding camp program organized by DBS Foundation, covering modern web development practices and industry-standard tools.",
  },
  {
    name: "Fundamental Front-End Web Development",
    company: "Dicoding",
    periode: "March 2025",
    img: "/assets/serti-1.png",
    description: "Certification in fundamental front-end web development covering HTML, CSS, JavaScript, and responsive design principles.",
  },
  {
    name: "English for Business Communication",
    company: "The British Institute",
    periode: "May 2025",
    img: "/assets/british.png",
    description: "Certification in professional English communication for business contexts from The British Institute.",
  },
  {
    name: "Uji Kemahiran Bahasa Indonesia",
    company: "Kementerian Pendidikan dan Kebudayaan",
    periode: "December 2024 - December 2026",
    img: "/assets/serti-2.png",
    description: "Indonesian language proficiency test certification issued by the Ministry of Education and Culture.",
  },
  {
    name: "Financial Literacy 101",
    company: "Dicoding",
    periode: "April 2025",
    img: "/assets/financial.png",
    description: "Certification covering essential financial literacy concepts including budgeting, investing, and personal finance management.",
  },
];

const total = certificate.length;

const Certificate = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="services">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <h1 className="text-2xl mb-4 font-bold tracking-tight flex items-center gap-3">
          <div className="p-2 rounded-ios bg-ios-yellow/15">
            <GiAchievement size={22} className="text-ios-yellow" />
          </div>
          Certificates
        </h1>
        <p className="text-[15px] text-label-secondary leading-relaxed">
          Some of the achievements I have during my career.
        </p>
        <div className="ios-separator" />
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[13px] text-label-tertiary">Total</span>
          <span className="text-[13px] font-semibold text-ios-blue px-2 py-0.5 rounded-full bg-ios-blue/10">
            {total}
          </span>
        </div>
      </motion.div>

      {/* Certificate Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {certificate.map((cert, index) => (
          <motion.div
            key={index}
            variants={scaleIn(index * 0.06)}
            className="ios-card overflow-hidden group cursor-pointer"
            onClick={() => openModal(cert)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative overflow-hidden">
              <img
                src={cert.img}
                alt={cert.name}
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="p-4">
              <h4 className="text-[14px] font-semibold text-white mb-1.5 line-clamp-2">{cert.name}</h4>
              <p className="text-[12px] text-label-secondary mb-1">{cert.company}</p>
              <p className="text-[11px] text-label-tertiary">{cert.periode}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} data={selectedCert} />
    </section>
  );
};

export default Certificate;
