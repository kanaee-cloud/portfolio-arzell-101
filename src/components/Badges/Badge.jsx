import React from "react";
import {
  SiLaravel,
  SiMysql,
  SiBootstrap,
  SiJavascript,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiTailwindcss,
  SiPostgresql,
  SiFastapi,
  SiFontawesome,
  SiMicrosoftexcel,
  SiReact,
  SiFirebase,
  SiAxios,
  SiFlutter,
  SiGo,
  SiRabbitmq,
  SiLinux,
} from "react-icons/si";

const frameworkMap = {
  Laravel: {
    icon: <SiLaravel size={12} />,
    color: "bg-[#FF453A]/10 text-[#FF453A] ring-[#FF453A]/20",
  },
  MySQL: {
    icon: <SiMysql size={12} />,
    color: "bg-[#FF9F0A]/10 text-[#FF9F0A] ring-[#FF9F0A]/20",
  },
  Bootstrap: {
    icon: <SiBootstrap size={12} />,
    color: "bg-[#5E5CE6]/10 text-[#5E5CE6] ring-[#5E5CE6]/20",
  },
  "Vanilla JS": {
    icon: <SiJavascript size={12} />,
    color: "bg-[#FFD60A]/10 text-[#FFD60A] ring-[#FFD60A]/20",
  },
  JavaScript: {
    icon: <SiJavascript size={12} />,
    color: "bg-[#FFD60A]/10 text-[#FFD60A] ring-[#FFD60A]/20",
  },
  "Excel JS": {
    icon: <SiMicrosoftexcel size={12} />,
    color: "bg-[#30D158]/10 text-[#30D158] ring-[#30D158]/20",
  },
  PostgreSQL: {
    icon: <SiPostgresql size={12} />,
    color: "bg-[#0A84FF]/10 text-[#0A84FF] ring-[#0A84FF]/20",
  },
  "Next.js": {
    icon: <SiNextdotjs size={12} />,
    color: "bg-white/10 text-white ring-white/20",
  },
  TypeScript: {
    icon: <SiTypescript size={12} />,
    color: "bg-[#0A84FF]/10 text-[#0A84FF] ring-[#0A84FF]/20",
  },
  Python: {
    icon: <SiPython size={12} />,
    color: "bg-[#FFD60A]/10 text-[#FFD60A] ring-[#FFD60A]/20",
  },
  Tailwind: {
    icon: <SiTailwindcss size={12} />,
    color: "bg-[#64D2FF]/10 text-[#64D2FF] ring-[#64D2FF]/20",
  },
  "Fast API": {
    icon: <SiFastapi size={12} />,
    color: "bg-[#30D158]/10 text-[#30D158] ring-[#30D158]/20",
  },
  "Font Awesome": {
    icon: <SiFontawesome size={12} />,
    color: "bg-[#5E5CE6]/10 text-[#5E5CE6] ring-[#5E5CE6]/20",
  },
  "React.js": {
    icon: <SiReact size={12} />,
    color: "bg-[#64D2FF]/10 text-[#64D2FF] ring-[#64D2FF]/20",
  },
  Firebase: {
    icon: <SiFirebase size={12} />,
    color: "bg-[#FF9F0A]/10 text-[#FF9F0A] ring-[#FF9F0A]/20",
  },
  Axios: {
    icon: <SiAxios size={12} />,
    color: "bg-[#BF5AF2]/10 text-[#BF5AF2] ring-[#BF5AF2]/20",
  },
  Flutter: {
    icon: <SiFlutter size={12} />,
    color: "bg-[#02569B]/10 text-[#54C5F8] ring-[#54C5F8]/20",
  },
  Golang: {
    icon: <SiGo size={12} />,
    color: "bg-[#00ADD8]/10 text-[#00ADD8] ring-[#00ADD8]/20",
  },
  RabbitMQ: {
    icon: <SiRabbitmq size={12} />,
    color: "bg-[#FF6600]/10 text-[#FF6600] ring-[#FF6600]/20",
  },
  Linux: {
    icon: <SiLinux size={12} />,
    color: "bg-[#FFD60A]/10 text-[#FFD60A] ring-[#FFD60A]/20",
  },
};

const Badge = ({ name }) => {
  const framework = frameworkMap[name];
  if (!framework) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium ring-1 ${framework.color}`}
    >
      {framework.icon}
      {name}
    </span>
  );
};

export default Badge;
