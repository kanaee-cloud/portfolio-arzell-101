import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Badge from "./Badges/Badge";

const Modal = ({ isOpen, onClose, project }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="relative max-h-screen w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-lg overflow-y-auto shadow-xl p-6">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 text-2xl"
          onClick={onClose}
        >
          <IoMdClose />
        </button>

        {/* Modal Content */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Image */}
          <div>
            <img
              src={project.img}
              alt={project.name}
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">
                {project.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {project.periode}
              </p>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
              {project.description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-2">
              {project.frameworks.map((fw, i) => (
                <Badge key={i} name={fw} />
              ))}
            </div>

            {/* Button */}
            <div className="mt-auto">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Kunjungi Repository
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
