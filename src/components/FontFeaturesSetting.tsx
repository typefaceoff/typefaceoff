import React, { useCallback } from 'react';
import '../styles/FontUploader.css';

interface FontFeaturesProps {
  fontSettingHandler: (newSettings: boolean[]) => void;
  fontFeatureOptions: string[];
  fontSettings: boolean[];
}

const FontFeaturesSetting: React.FC<FontFeaturesProps> = ({
  fontSettingHandler,
  fontFeatureOptions,
  fontSettings,
}: FontFeaturesProps) => {
  //create new array so the state change is triggered for the font preview rerender
  const onChecked = useCallback(
    (index: number) => {
      const newSettings = fontSettings.map((setting, i) => (i === index ? !setting : setting));
      fontSettingHandler(newSettings);
    },
    [fontSettings, fontSettingHandler]
  );

  return fontFeatureOptions.length === 0 ? (
    <p>No OpenType font features available</p>
  ) : (
    <>
      <p>OpenType font features available:</p>
      {fontFeatureOptions.map((feature, i) => (
        <label key={i}>
          <input type="checkbox" onChange={() => onChecked(i)} />
          {feature.toString()}
        </label>
      ))}
    </>
  );
};

export default FontFeaturesSetting;
