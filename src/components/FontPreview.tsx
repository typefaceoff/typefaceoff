import React from 'react';
import FontTextPlaceholders from './FontTextPlaceholders';

interface FontPreviewProps {
  fontFile: File;
  side: 'left' | 'right';
  lineHeight: number;
}

const FontPreview: React.FC<FontPreviewProps> = ({ fontFile, side, lineHeight }) => {
  const fontUrl = URL.createObjectURL(fontFile);

  const fontStyles: React.CSSProperties = {
    fontFamily: side === 'left' ? "'CustomFontLeft', sans-serif" : "'CustomFontRight', sans-serif",
    lineHeight: lineHeight,
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
