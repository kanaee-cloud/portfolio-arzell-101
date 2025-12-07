import { FaTerminal } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
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

const Banner = () => {
  return (
    <section className="w-full max-w-4xl flex flex-col items-center" id="home">
      <div className="">
        <h1 className="text-3xl mb-5 font-semibold">👋Hi, I'm M. Arsal Nawfal Ali!</h1>
        <h2 className="text-[16px] text-justify opacity-70 font-light">
          Recent graduate with a solid understanding of front-end development
          and a passion for creating engaging web experiences. I bring hands-on
          experience with popular JavaScript frameworks such as React, Vue.js,
          and Next.js, allowing me to develop scalable and performant
          applications. My drive extends beyond the front end, with a growing
          interest in the diverse landscape of software engineering.
        </h2>
      </div>
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="w-full mt-10"
      >
        <div className="mb-8">
          <h3 className="text-xl font-medium flex items-center gap-x-3 glassmorphism px-3 py-2">
            <IoIosStats size={24} className="opacity-70" />
            Personal Stats
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 lg:gap-x-10 mb-6 mt-6">
            <div className="flex flex-col rainbow-border px-3 py-2 rounded-lg">
              <div className="text-xl text-accent">
                <CountUp start={0} end={18} duration={15} />
              </div>
              <div className="text-sm tracking-[2px] font-primary">
                Years Old
              </div>
            </div>
            <div className="flex flex-col rainbow-border px-3 py-2 rounded-lg">
              <div className="text-xl text-accent">
                <CountUp start={0} end={45} duration={10} /> +
              </div>
              <div className="text-sm tracking-[2px] font-tertiary">
                Repository
              </div>
            </div>
            <div className="flex flex-col rainbow-border px-3 py-2 rounded-lg">
              <div className="text-xl text-accent">
                <CountUp start={0} end={5} duration={10} /> +
              </div>
              <div className="text-sm tracking-[2px] font-tertiary">
                Experience
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <h3 className="text-xl font-medium flex items-center gap-x-3 glassmorphism px-3 py-2">
            <FaTerminal size={20} className="opacity-70" />
            Tech Skills
          </h3>
          <p className="text-sm opacity-70 mt-6">Technologies I work with</p>
        </div>

        <Swiper
          grabCursor={true}
          loop={true}
          freeMode={true}
          slidesPerView={"auto"}
          spaceBetween={30}
          autoplay={{
            delay: 0, // jalan terus tanpa jeda
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={4000} // kecepatan scroll
          modules={[Autoplay]}
          className="mySwiper"
        >
          {frameworks.map((framework, index) => (
            <SwiperSlide
              key={index}
              className="w-56 flex items-center justify-center"
              style={{ width: "220px" }}
            >
              <div className="glassmorphism bg-slate-800 bg-opacity-40 hover:bg-slate-700 transition-all duration-300 p-6 rounded-xl flex flex-col items-center justify-center w-40 h-40">
                <div className="h-24 w-24 flex items-center justify-center">
                  <img
                    src={framework.imagesUrl}
                    alt={framework.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h4 className="mt-3 text-center font-medium">
                  {framework.name}
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default Banner;
