/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import FontTextPlaceholders from './FontTextPlaceholders';

interface FontPreviewProps {
  fontFile: File | null;
  side: 'left' | 'right';
  lineHeight: number;
}

const FontPreview: React.FC<FontPreviewProps> = ({ fontFile, side, lineHeight }) => {
  const fontUrl = fontFile ? URL.createObjectURL(fontFile) : '';

  const fontFamily = fontFile
    ? side === 'left'
      ? 'CustomFontLeft'
      : 'CustomFontRight'
    : 'var(--font-stack-default)';

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
        <FontTextPlaceholders lineHeight={lineHeight} />
      </div>
    </section>
  );
};

// Only re-render if fontFile, lineHeight, or side props change
export default React.memo(FontPreview, (prevProps, nextProps) => {
  return (
    prevProps.fontFile === nextProps.fontFile &&
    prevProps.lineHeight === nextProps.lineHeight &&
    prevProps.side === nextProps.side
  );
});
