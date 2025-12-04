import { BsBriefcase } from "react-icons/bs";
import { LuGraduationCap } from "react-icons/lu";
import { CiCircleInfo } from "react-icons/ci";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
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
    <section className="" id="about">
      <div>
        <h1 className="text-2xl mb-5 font-semibold flex items-center gap-x-2">
          <CiCircleInfo size={30} className="opacity-70" />
          About Me
        </h1>
        <h2 className="text-[16px] text-justify opacity-70 font-light leading-relaxed">
          My career trajectory begins as a Frontend Developer, where I intend to
          utilize my proficiency in React, Vue.js, and Next.js to build
          innovative web applications. I am proactive in seeking opportunities
          for professional development and aim to steadily advance my career by
          taking on increasing responsibilities and contributing to more
          significant projects.
        </h2>
        <div className="mt-5">
          <DownloadButton />
        </div>
      </div>

      {/* Work Experience */}
      <motion.div
        variants={fadeIn("left", 0.5)}
        whileInView={"show"}
        viewport={{ once: false, amount: 0.3 }}
      >
        <h3 className="text-xl font-medium flex items-center gap-x-3 glassmorphism px-3 py-2 mt-10">
          <BsBriefcase size={20} className="opacity-70" />
          Work Experience
        </h3>
        <p className="text-sm opacity-70 mt-6 mb-6">Career Detail</p>
        <div className="grid gap-6 sm:grid-cols-1">
          {job.map((service, index) => (
            <div
              key={index}
              className="glassmorphism p-4 rounded-lg shadow-md cursor-pointer"
              onClick={() => openModal(service)}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex flex-col text-center sm:text-left">
                  <h4 className="text-md font-semibold">{service.name}</h4>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-x-2 text-sm opacity-80 text-gray-700">
                    <p>{service.company}</p> | <p>{service.place}</p>
                  </div>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-x-2 text-sm opacity-80 text-gray-700">
                    <p>{service.periode}</p> • <p>{service.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div
        variants={fadeIn("left", 0.5)}
        whileInView={"show"}
        viewport={{ once: false, amount: 0.3 }}
      >
        <h3 className="text-xl font-medium flex items-center gap-x-3 glassmorphism px-3 py-2 mt-10">
          <LuGraduationCap size={20} className="opacity-70" />
          Education
        </h3>
        <p className="text-sm opacity-70 mt-6 mb-6">Education Detail</p>
        <div className="grid gap-6 sm:grid-cols-1">
          {education.map((ed, index) => (
            <div
              key={index}
              className="glassmorphism p-4 rounded-lg shadow-md cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img
                  src={ed.img}
                  alt={ed.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex flex-col text-center sm:text-left">
                  <h4 className="text-md font-semibold">{ed.name}</h4>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-x-2 text-sm opacity-80 text-gray-700">
                    <p>{ed.company}</p> | <p>{ed.place}</p>
                  </div>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-x-2 text-sm opacity-80 text-gray-700">
                    <p>{ed.periode}</p> • <p>{ed.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedService}
      />
    </section>
  );
};

export default About;
