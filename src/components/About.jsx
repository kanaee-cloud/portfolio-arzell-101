import { BsBriefcase } from "react-icons/bs";
import { LuGraduationCap } from "react-icons/lu";
import { CiCircleInfo } from "react-icons/ci";
import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, scaleIn } from "../variants";
import Modal from "./Modal";
import DownloadButton from "./CV/DownloadButton";

const job = [
  {
    name: "Front-end Developer",
    description:
      "Berkontribusi sebagai Front-end Developer pada pengembangan platform daring Akuprim yang menyederhanakan pembayaran pajak, membantu konsultan pajak menghemat waktu dan mengurangi risiko kesalahan.",
    company: "SOCA AI",
    place: "Kota Bandung, Jawa Barat",
    periode: "July 2024 - October 2024",
    role: "Internship",
    img: "https://media.licdn.com/dms/image/v2/D560BAQG5RZlgiOXUHQ/company-logo_200_200/company-logo_200_200/0/1682506784172/soca_ai_logo?e=2147483647&v=beta&t=6ItnW01p9WB3kzvju24LP3Alz9ODGuK_poPDcyYL-fc",
    frameworks: ["Laravel", "MySQL", "Tailwind", "Font Awesome"],
  },
  {
    name: "Software Engineering Mentee",
    description:
      "Lulusan program mentorship Software Engineering yang diselenggarakan oleh Compfest 17, mendapatkan bimbingan langsung dari para profesional industri untuk mengembangkan keterampilan teknis dan pemahaman mendalam tentang praktik terbaik dalam pengembangan perangkat lunak.",
    company: "Compfest 17",
    place: "Kota Depok, Jawa Barat",
    periode: "July 2025 - August 2025",
    role: "Internship",
    img: "https://media.licdn.com/dms/image/v2/D560BAQF2iLXPdV9mag/company-logo_200_200/B56ZYKxKXCHoAI-/0/1743937383993?e=2147483647&v=beta&t=pVeL3GZEb1ObPjjtojrw3R5L2kYP_8NZJXX9htmPyhQ",
    frameworks: ["React.js", "TypeScript", "Tailwind"],
  },
  {
    name: "Assistant Researcher",
    description:
      "Berkontribusi sebagai Asisten Peneliti dalam proyek penelitian yang berfokus pada pengembangan sistem keamanan siber berbasis AI, membantu dalam pengumpulan data, analisis, dan implementasi prototipe untuk meningkatkan pertahanan terhadap ancaman siber.",
    company: "Pusat Teknologi Pertahanan dan Keamanan Institut Teknologi Bandung",
    place: "Kota Bandung, Jawa Barat",
    periode: "February 2026 - Present",
    role: "Hybrid",
    img: "https://media.licdn.com/dms/image/v2/D560BAQFniVSH3C5FIQ/company-logo_200_200/company-logo_200_200/0/1666682463173?e=2147483647&v=beta&t=hDsD5yOPt5LzkfY2XCvHkorEurGSAeJM3UlhiYuZIBA",
    frameworks: ["Flutter", "Golang", "RabbitMQ", "Linux"],
  },
  {
    name: "Mobile Flutter Developer",
    description:
      "Berkontribusi sebagai Mobile Flutter Developer dalam pengembangan aplikasi mobile berbasis Flutter, membantu dalam pengumpulan data, analisis, dan implementasi prototipe untuk meningkatkan pengalaman pengguna.",
    company: "PT. Langgeng Sejahtera Kreasi Komputasi",
    place: "Kota Bandung, Jawa Barat",
    periode: "February 2026 - Present",
    role: "Hybrid",
    img: "https://media.licdn.com/dms/image/v2/C510BAQF2H1kpD1tNqQ/company-logo_200_200/company-logo_200_200/0/1630630670732?e=2147483647&v=beta&t=o0OlyIQFaFiuNb8RXCZFldLJ8odVX9f0eTkny0JuRoM",
    frameworks: ["Flutter", "Golang", "RabbitMQ", "Linux"],
  },
];

const education = [
  {
    name: "Rekayasa Perangkat Lunak",
    description:
      "Berkontribusi sebagai Front-end Developer pada pengembangan platform daring Akuprim yang menyederhanakan pembayaran pajak, membantu konsultan pajak menghemat waktu dan mengurangi risiko kesalahan.",
    company: "SMKN 4 Bandung",
    place: "Kota Bandung, Jawa Barat",
    periode: "July 2022 - Mei 2025",
    role: "Student",
    img: "https://smkn4bdg.sch.id/image/smkn4.png",
    frameworks: ["Laravel", "MySQL", "Tailwind", "Font Awesome"],
  },
  {
    name: "Front-end & Back-end Developer",
    description:
      "Berkontribusi sebagai Front-end Developer pada pengembangan platform daring Akuprim yang menyederhanakan pembayaran pajak, membantu konsultan pajak menghemat waktu dan mengurangi risiko kesalahan.",
    company: "Coding Camp DBS Foundation",
    place: "Remote",
    periode: "January 2025 - Mei 2025",
    role: "Student",
    img: "https://media.licdn.com/dms/image/v2/D560BAQEONBPsiZnU8w/company-logo_200_200/company-logo_200_200/0/1729482329489?e=2147483647&v=beta&t=dkMktUDkXt7130IuDwAyygkV13ZUc5gnI4JksnlUQ84",
    frameworks: ["Laravel", "MySQL", "Tailwind", "Font Awesome"],
  },
];

const ExperienceCard = ({ item, onClick, index }) => (
  <motion.div
    variants={scaleIn(index * 0.1)}
    className="ios-card p-4 cursor-pointer group"
    onClick={onClick}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
  >
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-ios overflow-hidden bg-gray-6 flex-shrink-0 ring-1 ring-white/5">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[15px] font-semibold text-white truncate">{item.name}</h4>
        <p className="text-[13px] text-label-secondary">
          {item.company} <span className="text-label-quaternary mx-1">•</span> {item.place}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[12px] text-label-tertiary">{item.periode}</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-ios-blue/10 text-ios-blue font-medium">
            {item.role}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

const About = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="about">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <h1 className="text-2xl mb-4 font-bold tracking-tight flex items-center gap-3">
          <div className="p-2 rounded-ios bg-ios-indigo/15">
            <CiCircleInfo size={22} className="text-ios-indigo" />
          </div>
          About Me
        </h1>
        <p className="text-[15px] text-label-secondary leading-relaxed text-justify">
          My career trajectory begins as a Frontend Developer, where I intend to
          utilize my proficiency in React, Vue.js, and Next.js to build
          innovative web applications. I am proactive in seeking opportunities
          for professional development and aim to steadily advance my career by
          taking on increasing responsibilities and contributing to more
          significant projects.
        </p>
        <div className="mt-5">
          <DownloadButton />
        </div>
      </motion.div>

      {/* Work Experience */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10"
      >
        <div className="ios-section-header flex items-center gap-3 mb-5">
          <div className="p-1.5 rounded-lg bg-ios-orange/15">
            <BsBriefcase size={16} className="text-ios-orange" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">Work Experience</span>
        </div>

        <div className="space-y-3">
          {job.map((service, index) => (
            <ExperienceCard
              key={index}
              item={service}
              index={index}
              onClick={() => openModal(service)}
            />
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10"
      >
        <div className="ios-section-header flex items-center gap-3 mb-5">
          <div className="p-1.5 rounded-lg bg-ios-green/15">
            <LuGraduationCap size={16} className="text-ios-green" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">Education</span>
        </div>

        <div className="space-y-3">
          {education.map((ed, index) => (
            <ExperienceCard key={index} item={ed} index={index} onClick={() => openModal(ed)} />
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={selectedService}
      />
    </section>
  );
};

export default About;
