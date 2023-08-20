import React from 'react';
import FontTextPlaceholders from './FontTextPlaceholders';

interface FontPreviewProps {
  fontFile: File;
  side: 'left' | 'right';
}

const FontPreview: React.FC<FontPreviewProps> = ({ fontFile, side }) => {
  const fontUrl = URL.createObjectURL(fontFile);

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
    <div>
      <style>{fontFace}</style>
      <div style={fontStyles}>
        <FontTextPlaceholders />
      </div>
    </div>
  );
};

export default FontPreview;
