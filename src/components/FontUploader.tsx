import React, { useState } from 'react';
import '../styles/FontUploader.css';

const FontUploader: React.FC<{
  side: 'left' | 'right';
  onFontSelected: (selectedFont: File | null) => void;
}> = ({ side, onFontSelected }) => {
  const [, setSelectedFont] = useState<File | null>(null);
  const [, setFontPreview] = useState<string | null>(null);
  const initialTxt = 'Drag and drop font files here';
  const [text, setText] = React.useState(initialTxt);
  let fontUrl;
    
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFont(file);
      onFontSelected(file);
      setFontPreview(URL.createObjectURL(file));

      // Set text as font name uploaded
      const fileName = e.target.files[0].name;
      const name = fileName.split('.').slice(0, -1).join('.');
      setText(name);
      fontUrl = URL.createObjectURL(e.target.files[0]);
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
      
      // Set text as font name when file is dragged
      const fileName = files[0].name;
      const name = fileName.split('.').slice(0, -1).join('.');
      setText(name);
      fontUrl = URL.createObjectURL(files[0]);
    }
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
          <div className="descriptor" style={fontStyles}>
            {text}
          </div>
        </div>
        <input
          className="input-button"
          type="file"
          accept=".otf, .ttf, .woff, .woff2"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FontUploader;
