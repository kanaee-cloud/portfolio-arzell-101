import { FaTerminal, FaReact, FaLaravel, FaNodeJs, FaVuejs } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiVite, SiFirebase, SiTypescript, SiJavascript } from "react-icons/si";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, scaleIn } from "../variants";
import CountUp from "react-countup";

const frameworks = [
  { name: "React", url: "https://reactjs.org/", icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", url: "https://nextjs.org/", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Laravel", url: "https://laravel.com/", icon: FaLaravel, color: "#FF2D20" },
  { name: "Vue.js", url: "https://vuejs.org/", icon: FaVuejs, color: "#42B883" },
  { name: "Tailwind", url: "https://tailwindcss.com/", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "TypeScript", url: "https://typescriptlang.org/", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", url: "https://developer.mozilla.org/", icon: SiJavascript, color: "#F7DF1E" },
  { name: "MongoDB", url: "https://www.mongodb.com/", icon: SiMongodb, color: "#47A248" },
  { name: "Node.js", url: "https://nodejs.org/", icon: FaNodeJs, color: "#5FA04E" },
  { name: "Express", url: "https://expressjs.com/", icon: SiExpress, color: "#FFFFFF" },
  { name: "Vite", url: "https://vitejs.dev/", icon: SiVite, color: "#646CFF" },
  { name: "Firebase", url: "https://firebase.google.com/", icon: SiFirebase, color: "#DD2C00" },
];

const stats = [
  { label: "Years Old", value: 18, suffix: "" },
  { label: "Repository", value: 45, suffix: "+" },
  { label: "Experience", value: 5, suffix: "+" },
];

// Duplicate items for seamless loop
const carouselItems = [...frameworks, ...frameworks];

const Banner = () => {
  return (
    <section className="w-full max-w-4xl flex flex-col items-center" id="home">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <h1 className="text-3xl lg:text-4xl mb-4 font-bold tracking-tight">
          <span className="text-label-secondary">Hi, I'm </span>
          <span className="text-gradient-blue">M. Arsal Nawfal Ali</span>
          <span className="ml-2 inline-block animate-float">👋</span>
        </h1>
        <p className="text-[15px] text-label-secondary leading-relaxed text-justify">
          Recent graduate with a solid understanding of front-end development
          and a passion for creating engaging web experiences. I bring hands-on
          experience with popular JavaScript frameworks such as React, Vue.js,
          and Next.js, allowing me to develop scalable and performant
          applications. My drive extends beyond the front end, with a growing
          interest in the diverse landscape of software engineering.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={fadeIn("up", 0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full mt-10"
      >
        <div className="mb-8">
          <div className="ios-section-header flex items-center gap-3 mb-6">
            <div className="p-1.5 rounded-lg bg-ios-blue/15">
              <IoIosStats size={18} className="text-ios-blue" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight">Personal Stats</span>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-3 lg:gap-4 mb-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={scaleIn(i * 0.08)}
                className="ios-stat-card text-center"
              >
                <div className="text-2xl lg:text-3xl font-bold text-ios-blue mb-1">
                  <CountUp start={0} end={stat.value} duration={2.5} />
                  <span className="text-ios-teal">{stat.suffix}</span>
                </div>
                <div className="text-[12px] text-label-tertiary font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tech Skills */}
        <div className="mb-4">
          <div className="ios-section-header flex items-center gap-3 mb-4">
            <div className="p-1.5 rounded-lg bg-ios-purple/15">
              <FaTerminal size={14} className="text-ios-purple" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight">Tech Skills</span>
          </div>
          <p className="text-[13px] text-label-tertiary mt-3 mb-5 pl-1">Technologies I work with</p>
        </div>

        {/* Infinite Carousel */}
        <div className="carousel-wrapper">
          <div className="carousel-track">
            {carouselItems.map((fw, i) => {
              const Icon = fw.icon;
              return (
                <a
                  key={i}
                  href={fw.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="carousel-item group"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${fw.color}15` }}
                  >
                    <Icon size={22} style={{ color: fw.color }} />
                  </div>
                  <span className="text-[11px] font-medium text-label-tertiary group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                    {fw.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
