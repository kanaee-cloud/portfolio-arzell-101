import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { PiContactlessPayment } from "react-icons/pi";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import Swal from "sweetalert2";
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";

const social = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/arsal-naufal",
    icon: <FaLinkedin size={24} />,
    bgColor: "#0077B5",
  },
  {
    name: "GitHub",
    url: "https://github.com/kanaee-cloud",
    icon: <FaGithub size={24} />,
    bgColor: "#333",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/_arsalnaufal",
    icon: <FaInstagram size={24} />,
    bgColor: "linear-gradient(135deg, #f58529, #dd2a7b, #8134af, #515bd4)",
  },
   {
    name: "YouTube",
    url: "https://www.youtube.com/@ryuuziverse6399", 
    icon: <FaYoutube size={24} />,
    bgColor: "#F7374F",
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const userId = process.env.REACT_APP_EMAILJS_USER_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      reply_to: formData.email,
    };

    emailjs.send(serviceId, templateId, templateParams, userId).then(
      (result) => {
        console.log("Pesan terkirim: ", result.text);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your message has been sent!",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error) => {
        console.log("Gagal mengirim pesan: ", error.text);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="" id="contact">
      <div>
        <h1 className="text-2xl mb-5 font-semibold flex items-center gap-x-2">
          <PiContactlessPayment size={30} className="opacity-70" />
          Contact
        </h1>
        <h2 className="text-[16px] text-justify opacity-70 font-light leading-relaxed">
          For further information please contact me.
        </h2>
        <hr className="opacity-30 my-5" />
      </div>
      <div>
        <h1 className="text-2xl mb-5 font-semibold flex items-center gap-x-2">
          {/* <CiCircleInfo size={30} className="opacity-70" /> */}
          Social Media
        </h1>
        <h2 className="text-[16px] text-justify opacity-70 font-light leading-relaxed">
          Get in touch with me on social media.
        </h2>
      </div>
      <div className="mt-5 w-full grid grid-cols-2 md:grid-cols-3 justify-center gap-4">
        {social.map((item, index) => {
          return (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-x-3 px-5 py-3 rounded-xl transition-all duration-300 text-white shadow-md hover:scale-[1.03]`}
              style={{
                background: item.bgColor,
              }}
            >
              <div>{item.icon}</div>
              <span className="text-sm font-medium">{item.name}</span>
            </a>
          );
        })}
      </div>
      <hr className="opacity-30 my-5" />
      <div>
        <h1 className="text-2xl mb-5 font-semibold flex items-center gap-x-2">
          {/* <CiCircleInfo size={30} className="opacity-70" /> */}
          Or send an email
        </h1>
        <h2 className="text-[16px] text-justify opacity-70 font-light leading-relaxed">
          Use your valid gmail so i can contact back.
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row">
        <motion.form
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.3 }}
          className="flex-1 glassmorphism flex flex-col gap-y-6 pb-24 p-6 items-start"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex gap-x-4">
            <input
              className="bg-transparent border-b py-3 outline-none w-full placeholder:opacity-50 focus:border-gradient transition-all"
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className="bg-transparent border-b py-3 outline-none w-full placeholder:opacity-50 focus:border-gradient transition-all"
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            className="bg-transparent border-b py-3 outline-none w-full placeholder:opacity-50 focus:border-gradient transition-all resize-none mb-12"
            placeholder="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="bg-black/20 text-white w-full py-3 px-6 rounded-lg shadow-md hover:scale-[1.03] transition-all duration-300">
            Submit
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
