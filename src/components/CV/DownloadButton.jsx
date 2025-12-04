import React from 'react';
import { MdOutlineFileDownload } from 'react-icons/md';

const DownloadButton = () => {
  const handleDownload = () => {
    const fileId = '10qfFaZsuADWRioBGNnjiFN8qUY4G_PYF'; 
    const url = `https://drive.google.com/uc?export=download&id=${fileId}`;

    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv-arsal.pdf'; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <button
      onClick={handleDownload}
      className="text-sm glassmorphism rounded-md py-2 px-4 flex items-center gap-x-3 text-white font-semibold hover:bg-black/20 transition-colors duration-300"
    >
      <MdOutlineFileDownload size={20} className="opacity-70"/>  
      Download CV
    </button>
  );
};

export default DownloadButton;
