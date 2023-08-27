import React from 'react';
import FontTextPlaceholders from './FontTextPlaceholders';

interface FontPreviewProps {
  fontFile: File | null;
  side: 'left' | 'right';
  lineHeight: number;
}

const FontPreview: React.FC<FontPreviewProps> = ({ fontFile, side, lineHeight }) => {
  const fontUrl = fontFile ? URL.createObjectURL(fontFile) : '';

  const fontStyles: React.CSSProperties = {
    fontFamily: fontFile
      ? side === 'left'
        ? "'CustomFontLeft', var(--font-stack-default)"
        : "'CustomFontRight', var(--font-stack-default)"
      : 'var(--font-stack-default)', // Use the default font if no font is selected
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
    <section>
      <style>{fontFace}</style>
      <div style={fontStyles}>
        <FontTextPlaceholders lineHeight={lineHeight} />
      </div>
    </section>
  );
};

export default FontPreview;
