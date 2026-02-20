import React from 'react';
import { MdOutlineFileDownload } from 'react-icons/md';

const DownloadButton = () => {
  const handleDownload = () => {
    const fileId = '1aH-vB7NALv1xGE-nbOulsEaWSHToEUfj'; 
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
      className="ios-btn-secondary inline-flex items-center gap-2 text-[14px]"
    >
      <MdOutlineFileDownload size={18} />
      Download CV
    </button>
  );
};

export default DownloadButton;
