import { useState } from 'react';
import '../styles/App.css';
import FontUploader from './FontUploader';
import FontPreview from './FontPreview';

function App() {
  // State for the selected font on the left
  const [selectedFontLeft, setSelectedFontLeft] = useState<File | null>(null);

  // State for the selected font on the right
  const [selectedFontRight, setSelectedFontRight] = useState<File | null>(null);

  // State for the line height on the right
  const [lineHeightRight, setLineHeightRight] = useState<number>(1.5);

  // State for the line height on the left
  const [lineHeightLeft, setLineHeightLeft] = useState<number>(1.5);

  // Handler for when a font is selected on the left side
  const handleFontSelectedLeft = (selectedFont: File | null) => {
    setSelectedFontLeft(selectedFont);
  };

  // Handler for when a font is selected on the right side
  const handleFontSelectedRight = (selectedFont: File | null) => {
    setSelectedFontRight(selectedFont);
  };

  return (
    <div className="app">
      <header>
        <h1>Welcome to TypeFaceOff!</h1>
        <p className="subtitle">Get started by dropping two fonts</p>
      </header>
      <main>
        {/* Left side */}
        <section className="side-container">
          <FontUploader onFontSelected={handleFontSelectedLeft} />
          <div className="line-height-adjustment">
            <label htmlFor="lineHeightInputLeft">Line spacing: </label>
            <input
              type="number"
              id="lineHeightInputLeft"
              value={lineHeightLeft}
              step={0.05}
              onChange={(e) => setLineHeightLeft(parseFloat(e.target.value))}
            />
          </div>
          {selectedFontLeft && (
            <FontPreview fontFile={selectedFontLeft} side="left" lineHeight={lineHeightLeft} />
          )}
        </section>

        {/* Right side */}
        <section className="side-container">
          <FontUploader onFontSelected={handleFontSelectedRight} />
          <div className="line-height-adjustment">
            <label htmlFor="lineHeightInputRight">Line spacing: </label>
            <input
              type="number"
              id="lineHeightInputRight"
              value={lineHeightRight}
              step={0.05}
              onChange={(e) => setLineHeightRight(parseFloat(e.target.value))}
            />
          </div>
          {selectedFontRight && (
            <FontPreview fontFile={selectedFontRight} side="right" lineHeight={lineHeightRight} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
