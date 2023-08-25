import React, { useState } from 'react';
import '../styles/FontUploader.css';

const FontUploader: React.FC<{ onFontSelected: (selectedFont: File | null) => void }> = ({
  onFontSelected,
}) => {
  const [, setSelectedFont] = useState<File | null>(null);
  const [, setFontPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFont(file);
      onFontSelected(file);
      setFontPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    const allowedExtensions = ['.otf', '.ttf', '.woff', '.woff2'];
    const fontFiles = files.filter((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return allowedExtensions.includes(`.${extension}`);
    });

    if (fontFiles.length > 0) {
      const selectedFile = fontFiles[0];
      setSelectedFont(selectedFile);
      onFontSelected(selectedFile);
      setFontPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="drop-area" onDrop={handleDrop} onDragOver={handleDragOver}>
      <p>Drag and drop a font file here</p>
      <input
        className="input-button"
        type="file"
        accept=".otf, .ttf, .woff, .woff2"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FontUploader;
