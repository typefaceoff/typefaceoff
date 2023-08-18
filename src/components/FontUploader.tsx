import React, { useState } from "react";
import "../styles/FontUploader.css";

const FontUploader: React.FC = () => {
  const [selectedFonts, setSelectedFonts] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFonts([...selectedFonts, ...files]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    // Filter out files that do not have the .otf extension
    const otfFiles = files.filter(file => file.name.endsWith(".otf"));

    setSelectedFonts([...selectedFonts, ...otfFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="font-uploader">
      <div className="drop-area" onDrop={handleDrop} onDragOver={handleDragOver}>
        <p>Drag and drop font files here</p>
        <input type="file" accept=".ttf, .otf" multiple onChange={handleFileChange} />
      </div>
      <div className="selected-fonts">
        {selectedFonts.map((font, index) => (
          <div key={index}>{font.name}</div>
        ))}
      </div>
    </div>
  );
};

export default FontUploader;
