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
  const onChecked = useCallback(
    (index: number) => {
      fontSettings[index] = !fontSettings[index];
      fontSettingHandler(fontSettings);
    },
    [fontSettings, fontSettingHandler]
  );

  const features = fontFeatureOptions.map(function (feature, i) {
    return (
      <label key={i}>
        <input type="checkbox" onChange={() => onChecked(i)} />
        {feature.toString()}
      </label>
    );
  });

  return <div>{features}</div>;
};

export default FontFeaturesSetting;
