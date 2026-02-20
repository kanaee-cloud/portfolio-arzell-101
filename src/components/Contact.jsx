import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { PiContactlessPayment } from "react-icons/pi";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, scaleIn } from "../variants";
import Swal from "sweetalert2";
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const social = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/arsal-naufal",
    icon: <FaLinkedin size={20} />,
    color: "text-[#0A84FF]",
    bgColor: "rgba(10,132,255,0.12)",
  },
  {
    name: "GitHub",
    url: "https://github.com/kanaee-cloud",
    icon: <FaGithub size={20} />,
    color: "text-white",
    bgColor: "rgba(142,142,147,0.18)",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/_arsalnaufal",
    icon: <FaInstagram size={20} />,
    color: "text-[#FF375F]",
    bgColor: "rgba(255,55,95,0.12)",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@ryuuziverse6399",
    icon: <FaYoutube size={20} />,
    color: "text-[#FF453A]",
    bgColor: "rgba(255,69,58,0.12)",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const userId = process.env.REACT_APP_EMAILJS_USER_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      reply_to: formData.email,
    };

    emailjs.send(serviceId, templateId, templateParams, userId).then(
      (result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Message sent successfully!",
          showConfirmButton: false,
          timer: 1500,
          background: '#1C1C1E',
          color: '#fff',
        });
        setIsSending(false);
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500,
          background: '#1C1C1E',
          color: '#fff',
        });
        setIsSending(false);
      }
    );

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <h1 className="text-2xl mb-4 font-bold tracking-tight flex items-center gap-3">
          <div className="p-2 rounded-ios bg-ios-green/15">
            <PiContactlessPayment size={22} className="text-ios-green" />
          </div>
          Contact
        </h1>
        <p className="text-[15px] text-label-secondary leading-relaxed">
          For further information, feel free to reach out.
        </p>
        <div className="ios-separator" />
      </motion.div>

      {/* Social Media */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-8"
      >
        <h2 className="text-[17px] font-semibold mb-4 tracking-tight">Social Media</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {social.map((item, index) => (
            <motion.a
              key={index}
              variants={scaleIn(index * 0.06)}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ios-card flex items-center gap-3 px-4 py-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ background: item.bgColor }}
            >
              <span className={item.color}>{item.icon}</span>
              <span className="text-[13px] font-medium text-white">{item.name}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      <div className="ios-separator" />

      {/* Email Form */}
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-[17px] font-semibold mb-2 tracking-tight">Send a Message</h2>
        <p className="text-[13px] text-label-tertiary mb-6">Use your valid email so I can get back to you.</p>

        <form
          className="ios-card p-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] text-label-tertiary font-medium uppercase tracking-wider mb-2 block">
                Name
              </label>
              <input
                className="ios-input"
                type="text"
                placeholder="Your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-[12px] text-label-tertiary font-medium uppercase tracking-wider mb-2 block">
                Email
              </label>
              <input
                className="ios-input"
                type="email"
                placeholder="your@email.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] text-label-tertiary font-medium uppercase tracking-wider mb-2 block">
              Message
            </label>
            <textarea
              className="ios-input resize-none h-32"
              placeholder="Write your message..."
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="ios-btn w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <IoMdSend size={16} />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
