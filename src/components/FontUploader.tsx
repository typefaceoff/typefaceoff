import React, { useState } from 'react';
import '../styles/FontUploader.css';

const FontUploader: React.FC<({ side: 'left' | 'right', onFontSelected: (selectedFonts: File[]) => void })> = ({ side, onFontSelected }) => {
  const [selectedFonts, setSelectedFonts] = useState<File[]>([]);
  const initialTxt = "Drag and drop font files here";
  const [text, setText] = React.useState(initialTxt);
  let fontUrl;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFonts([...selectedFonts, ...files]);
      onFontSelected([...selectedFonts, ...files]);

      // Set text as font name uploaded
      const fileName = e.target.files[0].name
      const name = fileName.split('.').slice(0, -1).join('.')
      setText(name);
      fontUrl = URL.createObjectURL(e.target.files[0]);
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

    // Set text as font name when file is dragged 
    const fileName =files[0].name
    const name = fileName.split('.').slice(0, -1).join('.')
    setText(name);
    fontUrl = URL.createObjectURL(files[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const fontStyles: React.CSSProperties = {
    fontFamily: side === 'left' ? "'CustomFontLeft', sans-serif" : "'CustomFontRight', sans-serif",
  };

  const fontFace = `
  @font-face {
    font-family: '${side === 'left' ? 'CustomFontLeft' : 'CustomFontRight'}';
    src: url(${fontUrl}) format('opentype');
    font-display: swap;
  }
`;

  return (
    <div className="font-uploader">
      <div className="drop-area" onDrop={handleDrop} onDragOver={handleDragOver}>
        <div>
          <style>{fontFace}</style>
          <div className="descriptor" style={fontStyles}>{text}</div>
        </div>
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
