/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import FontTextPlaceholders from './FontTextPlaceholders';

interface FontPreviewProps {
  fontFile: File | null;
  side: 'left' | 'right';
  lineHeight: number;
  proofingText: string;
}

function getFontFamily(fontFile: File | null, side: string) {
  if (fontFile) {
    return side === 'left' ? 'CustomFontLeft' : 'CustomFontRight';
  }
  return 'var(--font-stack-default)';
}

const FontPreview: React.FC<FontPreviewProps> = ({ fontFile, side, lineHeight, proofingText }) => {
  const fontUrl = fontFile ? URL.createObjectURL(fontFile) : '';

  // Getting Font Family depending on the fontFile and side
  const fontFamily = getFontFamily(fontFile, side);

  const fontStyles: React.CSSProperties = {
    fontFamily: fontFamily,
  };

  const fontFace = `
    @font-face {
      font-family: '${fontFamily}';
      src: url(${fontUrl}) format('opentype');
      font-display: swap;
    }
  `;

  return (
    <section>
      <style>{fontFace}</style>
      <div style={fontStyles}>
        <FontTextPlaceholders proofingText={proofingText} lineHeight={lineHeight} />
      </div>
    </section>
  );
};

// Only re-render if fontFile, lineHeight, or side props change
export default React.memo(FontPreview, (prevProps, nextProps) => {
  return (
    prevProps.fontFile === nextProps.fontFile &&
    prevProps.lineHeight === nextProps.lineHeight &&
    prevProps.side === nextProps.side &&
    prevProps.proofingText === nextProps.proofingText
  );
});
