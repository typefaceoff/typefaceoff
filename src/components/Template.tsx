/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import postcss from 'postcss';
import ArticleTextPlaceholders from './ArticleTextPlaceHolders';
import PosterTextPlaceholders from './PosterTextPlaceHolders';

interface FontPreviewProps {
  fontFile: File | null;
  googleFontData: string | null;
  side: 'left' | 'right';
  lineHeight: number;
  fontFeatureOptions: string[];
  fontSettings: boolean[];
  template: 'Article' | 'Poster';
}

function getFontFamily(fontFile: File | string | null, side: string) {
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
  template,
}) => {
  let fontUrl = '';
  let fontFamily = '';
  let fontFace = '';

  if (googleFontData && !fontFile) {
    fontFamily = getFontFamily(googleFontData, side);
    const parsedCss = postcss.parse(googleFontData);
    parsedCss.walkAtRules('font-face', (rule) => {
      rule.walkDecls('font-family', (decl) => {
        decl.value = `${fontFamily}`;
      });
    });
    fontFace = parsedCss.toString();
  }

  if (fontFile && !googleFontData) {
    fontUrl = fontFile ? URL.createObjectURL(fontFile) : '';
    fontFamily = getFontFamily(fontFile, side);

    fontFace = `
      @font-face {
        font-family: '${fontFamily}';
        src: url(${fontUrl}) format('opentype');
        font-display: swap;
      }
    `;
  }

  const featureSettings = getFontSettings(fontFeatureOptions, fontSettings);

  const fontStyles: React.CSSProperties = {
    fontFamily: fontFamily,
    fontFeatureSettings: featureSettings,
  };

  if (template == 'Article') {
    return (
      <section>
        <style>{fontFace}</style>
        <div style={fontStyles}>
          <ArticleTextPlaceholders lineHeight={lineHeight} />
        </div>
      </section>
    );
  } else if (template == 'Poster') {
    return (
      <section>
        <style>{fontFace}</style>
        <div style={fontStyles}>
          <PosterTextPlaceholders lineHeight={lineHeight} />
        </div>
      </section>
    );
  }
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
