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
} from "react-icons/si";

const frameworkMap = {
  Laravel: {
    icon: <SiLaravel size={14} />,
    color: "bg-red-900 text-red-300",
  },
  MySQL: {
    icon: <SiMysql size={14} />,
    color: "bg-orange-900 text-orange-300",
  },
  Bootstrap: {
    icon: <SiBootstrap size={14} />,
    color: "bg-indigo-900 text-indigo-300",
  },
  "Vanilla JS": {
    icon: <SiJavascript size={14} />,
    color: "bg-yellow-600 text-yellow-100",
  },
  JavaScript: {
    icon: <SiJavascript size={14} />,
    color: "bg-yellow-700 text-yellow-100",
  },
  "Excel JS": {
    icon: <SiMicrosoftexcel size={14} />,
    color: "bg-green-900 text-green-300",
  },
  PostgreSQL: {
    icon: <SiPostgresql size={14} />,
    color: "bg-blue-900 text-blue-300",
  },
  "Next.js": {
    icon: <SiNextdotjs size={14} />,
    color: "bg-black text-white",
  },
  TypeScript: {
    icon: <SiTypescript size={14} />,
    color: "bg-blue-800 text-blue-200",
  },
  Python: {
    icon: <SiPython size={14} />,
    color: "bg-yellow-700 text-yellow-100",
  },
  Tailwind: {
    icon: <SiTailwindcss size={14} />,
    color: "bg-cyan-800 text-cyan-200",
  },
  "Fast API": {
    icon: <SiFastapi size={14} />,
    color: "bg-green-800 text-green-200",
  },
  "Font Awesome": {
    icon: <SiFontawesome size={14} />,
    color: "bg-blue-800 text-blue-200",
  },
  "React.js": {
    icon: <SiReact size={14} />,
    color: "bg-cyan-900 text-cyan-300",
  },
  Firebase: {
    icon: <SiFirebase size={14} />,
    color: "bg-amber-700 text-amber-100",
  },
  Axios: {
    icon: <SiAxios size={14} />,
    color: "bg-gray-800 text-gray-200",
  },
};

const Badge = ({ name }) => {
  const framework = frameworkMap[name];
  if (!framework) return null;

  return (
    <span
      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${framework.color}`}
    >
      {framework.icon}
      {name}
    </span>
  );
};

export default Badge;
