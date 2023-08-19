import React, { useState } from "react";
import "../styles/FontUploader.css";

const FontUploader: React.FC<{ onFontSelected: (selectedFonts: File[]) => void }> = ({
  onFontSelected,
}) => {
  const [selectedFonts, setSelectedFonts] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFonts([...selectedFonts, ...files]);
      onFontSelected([...selectedFonts, ...files]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    // Filter out files that do not have the .otf extension
    const otfFiles = files.filter((file) => file.name.endsWith(".otf"));

    setSelectedFonts([...selectedFonts, ...otfFiles]);
    onFontSelected([...selectedFonts, ...otfFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="font-uploader">
      <div className="drop-area" onDrop={handleDrop} onDragOver={handleDragOver}>
        <p>Drag and drop font files here</p>
        <input
          className="input-button"
          type="file"
          accept=".otf"
          multiple
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FontUploader;
