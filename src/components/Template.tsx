/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import postcss from 'postcss';
import ArticleTextPlaceHolders from './TemplatePlaceHolders/ArticleTextPlaceHolders';
import PosterTextPlaceHolders from './TemplatePlaceHolders/PosterTextPlaceHolders';
import FontTextPlaceHolders from './TemplatePlaceHolders/FontTextPlaceHolders';
import HeadingTextPlaceHolders from './TemplatePlaceHolders/HeadingTextPlaceHolders';

interface TemplateProps {
  fontFile: File | null;
  googleFontData: string | null;
  side: 'left' | 'right';
  lineHeight: number;
  fontFeatureOptions: string[];
  fontSettings: boolean[];
  template: string;
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

const Template: React.FC<TemplateProps> = ({
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
  switch (template) {
    case 'Article':
      return (
        <section>
          <style>{fontFace}</style>
          <div style={fontStyles}>
            <ArticleTextPlaceHolders lineHeight={lineHeight} />
          </div>
        </section>
      );
    case 'Poster':
      return (
        <section>
          <style>{fontFace}</style>
          <div style={fontStyles}>
            <PosterTextPlaceHolders lineHeight={lineHeight} />
          </div>
        </section>
      );
    case 'Template':
      return (
        <section>
          <style>{fontFace}</style>
          <div style={fontStyles}>
            <FontTextPlaceHolders lineHeight={lineHeight} />
          </div>
        </section>
      );
    case 'Heading':
      return (
        <section>
          <style>{fontFace}</style>
          <div style={fontStyles}>
            <HeadingTextPlaceHolders lineHeight={lineHeight} />
          </div>
        </section>
      );
    default:
      return <></>;
  }
};

// Only re-render if fontFile, lineHeight, or side props change
export default React.memo(Template, (prevProps, nextProps) => {
  return (
    prevProps.fontFile === nextProps.fontFile &&
    prevProps.googleFontData === nextProps.googleFontData &&
    prevProps.lineHeight === nextProps.lineHeight &&
    prevProps.side === nextProps.side &&
    prevProps.fontFeatureOptions === nextProps.fontFeatureOptions &&
    prevProps.fontSettings === nextProps.fontSettings
  );
});
