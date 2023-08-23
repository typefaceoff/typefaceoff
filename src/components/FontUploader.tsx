import React, { useState } from 'react';
import '../styles/FontUploader.css';

const FontUploader: React.FC<{ onFontSelected: (selectedFonts: File[]) => void }> = ({
  onFontSelected,
}) => {
  const [selectedFonts, setSelectedFonts] = useState<File[]>([]);
  let initialTxt= "Drag and drop font files here";
  const [text, setText] = React.useState(initialTxt);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFonts([...selectedFonts, ...files]);
      onFontSelected([...selectedFonts, ...files]);
      
      var fileName = e.target.files[0].name
      setText(fileName.split('.').slice(0, -1).join('.'));
      
    }
  };



  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    // Filter out files that have the allowed extensions
    const allowedExtensions = ['.otf', '.ttf', '.woff', '.woff2'];
    const fontFiles = files.filter((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return allowedExtensions.includes(`.${extension}`);
    });

    setSelectedFonts([...selectedFonts, ...fontFiles]);
    onFontSelected([...selectedFonts, ...fontFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="font-uploader">
      <div className="drop-area" onDrop={handleDrop} onDragOver={handleDragOver}>
        <p id="descriptor">{text}</p>
        <input
          className="input-button"
          type="file"
          accept=".otf, .ttf, .woff, .woff2"
          multiple
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FontUploader;
