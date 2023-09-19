import { useState } from 'react';
import '../styles/App.css';
import FontUploader from './FontUploader';
import FontPreview from './FontPreview';
import { BsGithub } from 'react-icons/bs';

function App() {
  // State for the selected font on the left
  const [selectedFontLeft, setSelectedFontLeft] = useState<File | null>(null);

  // State for the selected font on the right
  const [selectedFontRight, setSelectedFontRight] = useState<File | null>(null);

  // State for the line height on the right
  const [lineHeightRight, setLineHeightRight] = useState<number>(1.5);

  // State for the line height on the left
  const [lineHeightLeft, setLineHeightLeft] = useState<number>(1.5);

  // State for the proofing text
  const [proofingText, setProofingText] = useState<string>('');

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
        <h1>Welcome to Typefaceoff!</h1>
        <p className="subtitle">Get started by dropping two fonts</p>
        <div>
          <label htmlFor="proofingText">Proofing text: </label>
          <input
            type="text"
            id="proofingText"
            onChange={(e) => {
              setProofingText(e.target.value);
            }}
          />
        </div>
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
              min={0.95}
              max={1.9}
              step={0.05}
              onChange={(e) => setLineHeightLeft(parseFloat(e.target.value))}
            />
          </div>
          {
            <FontPreview
              fontFile={selectedFontLeft}
              side="left"
              lineHeight={lineHeightLeft}
              proofingText={proofingText}
            />
          }
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
              min={0.95}
              max={1.9}
              step={0.05}
              onChange={(e) => setLineHeightRight(parseFloat(e.target.value))}
            />
          </div>
          {
            <FontPreview
              fontFile={selectedFontRight}
              side="right"
              lineHeight={lineHeightRight}
              proofingText={proofingText}
            />
          }
        </section>
      </main>
      <footer>
        <p className="footer-text">
          Typefaceoff takes font licensing seriously. It works locally in your browser meaning your
          fonts stay on your device and aren’t uploaded anywhere.{' '}
        </p>
        <a href="https://github.com/typefaceoff/typefaceoff" target="_blank">
          <BsGithub className="github-icon" />
        </a>
      </footer>
    </div>
  );
}

export default App;
