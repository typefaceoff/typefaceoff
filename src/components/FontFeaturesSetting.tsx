import React, { useCallback } from 'react';
import FontFeatureCheckbox from './FontFeatureCheckbox';
import '../styles/FontUploader.css';

interface FontFeaturesProps {
  fontSettingHandler: (feature: boolean[] | null) => void;
  fontFeatureOptions: string[];
  fontSettings: boolean[];
}

const FontFeaturesSetting: React.FC<FontFeaturesProps> = ({
  fontSettingHandler,
  fontFeatureOptions,
  fontSettings,
}) => {
  const onChecked = useCallback(
    (index: number) => {
      fontSettings[index] = !fontSettings[index];
      console.log('Settings: ', fontSettings.toString());
      fontSettingHandler(fontSettings);
    },
    [fontSettings, fontSettingHandler]
  );

  const features = fontFeatureOptions.map(function (feature, i) {
    return (
      <FontFeatureCheckbox
        label={feature.toString()}
        value={fontSettings[i]}
        onChange={() => onChecked(i)}
      />
    );
  });

  if (fontFeatureOptions.length == 0) {
    return (
      <div>
        <p>No OpenType font features detected</p>
      </div>
    );
  } else {
    return <div>{features}</div>;
  }
};

export default FontFeaturesSetting;
