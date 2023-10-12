/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import FontTextPlaceholders from './FontTextPlaceholders';

interface FontPreviewProps {
  fontFile: File | null;
  googleFontData: string | null;
  side: 'left' | 'right';
  lineHeight: number;
  fontFeatureOptions: string[];
  fontSettings: boolean[];
}

function getFontFamily(fontFile: File | null, side: string) {
  if (fontFile) {
    return side === 'left' ? 'CustomFontLeft' : 'CustomFontRight';
  }
  return 'var(--font-stack-default)';
}

function getFontSettings(featureOptions: string[], featureSettings: boolean[]) {
  let setting = ``;
  for (let i = 0; i < featureOptions.length; i++) {
    if (featureSettings[i]) {
      setting += "'" + featureOptions[i] + "'" + ' on,';
    } else {
      setting += "'" + featureOptions[i] + "'" + ' off,';
    }
  }
  setting = setting.slice(0, -1);
  return setting;
}

const FontPreview: React.FC<FontPreviewProps> = ({
  fontFile,
  googleFontData,
  side,
  lineHeight,
  fontFeatureOptions,
  fontSettings,
}: FontPreviewProps): JSX.Element | null => {

  if(googleFontData && !fontFile){

    const fontStyles: React.CSSProperties = {
      fontFamily: extractGoogleFontFamily(googleFontData)
    };

    return (
      <section>
        <style>{googleFontData}</style>
        <div style={fontStyles}>
          <FontTextPlaceholders lineHeight={lineHeight} />
        </div>
      </section>
    );
  }

  if(fontFile && !googleFontData){
    const fontUrl = fontFile ? URL.createObjectURL(fontFile) : '';

    // Getting Font Family depending on the fontFile and side
    const fontFamily = getFontFamily(fontFile, side);
    const featureSettings = getFontSettings(fontFeatureOptions, fontSettings);

    const fontStyles: React.CSSProperties = {
      fontFamily: fontFamily,
      fontFeatureSettings: featureSettings,
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
  }
  return null;
};

// Only re-render if fontFile, lineHeight, or side props change
export default React.memo(FontPreview, (prevProps, nextProps) => {
  return (
    prevProps.fontFile === nextProps.fontFile &&
    prevProps.googleFontData === nextProps.googleFontData &&
    prevProps.lineHeight === nextProps.lineHeight &&
    prevProps.side === nextProps.side &&
    prevProps.fontFeatureOptions === nextProps.fontFeatureOptions &&
    prevProps.fontSettings === nextProps.fontSettings
  );
});

function extractGoogleFontFamily(cssString: string): string {
  const fontFamilyRegex = /font-family:\s*['"]?([^"']*)['"]?;/;
  const match = cssString.match(fontFamilyRegex);
  if (match && match[1]) {
    return match[1];
  }
  return ''; // Font family not found
}
