import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { GiAchievement } from "react-icons/gi";
// import Img1 from "../assets/serti-1.png";
// import Img2 from "../assets/serti-2.png";
// import Img3 from "../assets/serti-3.jpg";

const certificate = [
  {
    name: "Certificate of Competence in Web Development",
    company: "Lembaga Sertifikasi Profesi Teknologi Digital",
    periode: "January 2025 - January 2028",
    img: "/assets/bnsp.png",
  },
  {
    name: "Coding Camp by DBS Foundation",
    company: "DBS Foundation",
    periode: "May 2025",
    img: "/assets/dbs.png",
  },
  {
    name: "Fundamental Front-End Web Development",
    company: "Dicoding",
    periode: "March 2025",
    img: "/assets/serti-1.png",
  },
  {
    name: "English for Business Communication",
    company: "The British Institute",
    periode: "May 2025",
    img: "/assets/british.png",
  },
  {
    name: "Uji Kemahiran Bahasa Indonesia",
    company: "Kementerian Pendidikan dan Kebudayaan",
    periode: "December 2024 - December 2026",
    img: "/assets/serti-2.png",
  },
  {
    name: "Financial Literacy 101",
    company: "Dicoding",
    periode: "April 2025",
    img: "/assets/financial.png",
  },
];

const total = certificate.length;

const Certificate = () => {
  return (
    <section className="" id="services">
      <div>
        <h1 className="text-2xl mb-5 font-semibold flex items-center gap-x-2">
          <GiAchievement size={30} className="opacity-70" />
          Certificate
        </h1>
        <h2 className="text-[16px] text-justify opacity-70 font-light leading-relaxed">
          Some of the achievements i have during my career.
        </h2>
        <hr className="opacity-30 my-3" />
      </div>
      <p className="text-sm ">Total: {total}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {certificate.map((cert, index) => (
          <motion.div
            key={index}
            className="bg-black/30  rounded-lg shadow-md mb-6 flex flex-col"
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
          >
            <img
              src={cert.img}
              alt=""
              className="w-full h-52 object-cover rounded-t-lg "
            />
            <div className="p-4 flex flex-col gap-y-2">
              <h4 className="text-sm font-semibold">{cert.name}</h4>
              <p className="text-sm font-primary leading-tight opacity-80 text-gray-700">
                {cert.company}
              </p>
              <p className="text-sm font-primary leading-tight opacity-80 text-gray-700">
                {cert.periode}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certificate;
