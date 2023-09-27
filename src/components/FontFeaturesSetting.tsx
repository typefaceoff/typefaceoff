import FontFeatureCheckbox from './FontFeatureCheckbox';

const FontFeaturesSetting = ({ fontFeatureOptions, fontSettings, fontSettingHandler }) => {
  const handleChangeOne = (e, i) => {
    if (fontSettings[i]) {
      fontSettings[i] = false;
    } else {
      fontSettings[i] = true;
    }
    e.fontSettingHandler(fontSettings);
  };

  var features = fontFeatureOptions.map(function (feature, i) {
    return (
      <FontFeatureCheckbox
        label={feature.toString()}
        value={fontSettings[i]}
        onChange={handleChangeOne(this, i)}
      />
    );
  });

  return <div>{features}</div>;
};
export default FontFeaturesSetting;
