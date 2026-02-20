import { FaTerminal } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, scaleIn } from "../variants";
import CountUp from "react-countup";

const frameworks = [
  {
    name: "React",
    url: "https://reactjs.org/",
    imagesUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
  {
    name: "Next.js",
    url: "https://nextjs.org/",
    imagesUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
  },
  {
    name: "Laravel",
    url: "https://laravel.com/",
    imagesUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
  },
  {
    name: "Tailwind",
    url: "https://tailwindcss.com/",
    imagesUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  },
  {
    name: "MongoDB",
    url: "https://www.mongodb.com/",
    imagesUrl: "https://www.svgrepo.com/show/331488/mongodb.svg",
  },
  {
    name: "Node.js",
    url: "https://nodejs.org/en/",
    imagesUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
  },
  {
    name: "Express.js",
    url: "https://expressjs.com/",
    imagesUrl:
      "https://cdn.worldvectorlogo.com/logos/expressjs.svg",
  },
  {
    name: "Vite",
    url: "https://expressjs.com/",
    imagesUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/640px-Vitejs-logo.svg.png",
  },
  {
    name: "Firebase",
    url: "https://expressjs.com/",
    imagesUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Firebase_Logo_%28No_wordmark%29_%282024-%29.svg/640px-Firebase_Logo_%28No_wordmark%29_%282024-%29.svg.png",
  },
];

const stats = [
  { label: "Years Old", value: 18, suffix: "" },
  { label: "Repository", value: 45, suffix: "+" },
  { label: "Experience", value: 5, suffix: "+" },
];

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
        <div className="mb-6">
          <div className="ios-section-header flex items-center gap-3 mb-4">
            <div className="p-1.5 rounded-lg bg-ios-purple/15">
              <FaTerminal size={14} className="text-ios-purple" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight">Tech Skills</span>
          </div>
          <p className="text-[13px] text-label-tertiary mt-3 mb-5 pl-1">Technologies I work with</p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-3 lg:grid-cols-5 gap-3"
        >
          {frameworks.map((fw, i) => (
            <motion.a
              key={i}
              href={fw.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={scaleIn(i * 0.04)}
              className="tech-card group"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="w-10 h-10 flex items-center justify-center mb-3 relative z-10 group-hover:scale-110 transition-transform duration-300">
                <img
                  src={fw.imagesUrl}
                  alt={fw.name}
                  className="max-h-full max-w-full object-contain opacity-65 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <span className="text-[11px] font-medium text-label-tertiary group-hover:text-white relative z-10 transition-colors duration-300">
                {fw.name}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;
