import React from "react";

interface FontPreviewProps {
  fontFile: File;
  text: string;
}

const FontPreview: React.FC<FontPreviewProps> = ({ fontFile, text }) => {
  const fontUrl = URL.createObjectURL(fontFile);

  const fontStyles: React.CSSProperties = {
    fontFamily: "'CustomFontRight', sans-serif",
  };

  const fontFace = `
    @font-face {
      font-family: 'CustomFontRight';
      src: url(${fontUrl}) format('opentype');
    }
  `;

  return (
    <div>
      <style>{fontFace}</style>
      <div style={fontStyles}>{text}</div>
    </div>
  );
};

export default FontPreview;
