import FontFeatureCheckbox from './FontFeatureCheckbox';

const FontFeaturesSetting = ({ fontFeatureOptions, fontSettings, fontSettingHandler }) => {
  const handleChange = (i) => {
    if (fontSettings[i]) {
      fontSettings[i] = false;
    } else {
      fontSettings[i] = true;
    }
    console.log('Feature settings ', fontSettings.toString());
    fontSettingHandler(fontSettings);
  };

  var features = fontFeatureOptions.map(function (feature, i) {
    return (
      <FontFeatureCheckbox
        label={feature.toString()}
        value={fontSettings[i]}
        onChange={() => handleChange(i)}
      />
    );
  });

  return <div>{features}</div>;
};
export default FontFeaturesSetting;
