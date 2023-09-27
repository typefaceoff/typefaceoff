import { useState } from 'react';
import '../styles/App.css';
import FontUploader from './FontUploader';
import FontPreview from './FontPreview';
import { BsGithub } from 'react-icons/bs';
import { proofingText } from './constants';
import opentype, { Font } from 'opentype.js';

function App() {
  // State for the selected font on the left
  const [selectedFontLeft, setSelectedFontLeft] = useState<File | null>(null);

  // State for the selected font on the right
  const [selectedFontRight, setSelectedFontRight] = useState<File | null>(null);

  // State for the line height on the right
  const [lineHeightRight, setLineHeightRight] = useState<number>(1.5);

  // State for the line height on the left
  const [lineHeightLeft, setLineHeightLeft] = useState<number>(1.5);

  // Opentype feature option names from the gsub table of the font file on the left
  const [fontFeatureOptionsLeft, setFontFeatureOptionsLeft] = useState<unknown[]>([]);

  // Opentype feature option names from the gsub table of the font file on the right
  const [fontFeatureOptionsRight, setFontFeatureOptionsRight] = useState<unknown[]>([]);

  const handleFontSelected = (selectedFont: File | null, side: string) => {
    if (selectedFont != null) {
      const buffer = selectedFont.arrayBuffer();
      buffer.then((data) => {
        const otfFont = opentype.parse(data);
        const featureNames = [
          ...Array.from(new Set(otfFont.tables.gsub.features.map((f: { tag: string }) => f.tag))),
        ];
        // Check featureNames is not empty
        if (featureNames.length === 0 || featureNames[0] === undefined) {
          featureNames.push('No OpenType features detected');
        }

        if (side === 'left') {
          setFontFeatureOptionsLeft(featureNames);
        }
        if (side === 'right') {
          setFontFeatureOptionsRight(featureNames);
        }
      });
    }
  };

  // Handler for when a font is selected on the left side
  const handleFontSelectedLeft = (selectedFont: File | null) => {
    setSelectedFontLeft(selectedFont);
    handleFontSelected(selectedFont, 'left');
  };

  // Handler for when a font is selected on the right side
  const handleFontSelectedRight = (selectedFont: File | null) => {
    setSelectedFontRight(selectedFont);
    handleFontSelected(selectedFont, 'right');
  };

  // Handles page print
  const handlePrint = () => {
    const css = '@page { size: landscape; }',
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

    style.media = 'print';

    if ('styleSheet' in style) {
      const styleSheet = style.sheet as CSSStyleSheet;
      styleSheet.insertRule(css, styleSheet.cssRules.length);
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

    window.print();
  };

  // Event handler to set a common text for all proof elements
  const setCommonText = () => {
    const all = document.getElementsByClassName('proof');
    for (const elem of all) {
      elem.textContent = proofingText;
    }
  };

  return (
    <div className="app">
      <header>
        <h1 className="title">Welcome to Typefaceoff!</h1>
        <p className="subtitle">Get started by dropping two fonts</p>
        <button className="button" onClick={setCommonText}>
          Alice in Wonderland
        </button>
        <button
          className="button"
          onClick={() => {
            handlePrint();
          }}
        >
          Save previews as PDF
        </button>
      </header>
      <main>
        {/* Left side */}
        <section className="side-container">
          <div className="font-uploader">
            <FontUploader onFontSelected={handleFontSelectedLeft} />
          </div>
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
          <div>
            <p>Font features detected: {fontFeatureOptionsLeft.toString()}</p>
          </div>
          <div className="font-preview">
            {<FontPreview fontFile={selectedFontLeft} side="left" lineHeight={lineHeightLeft} />}
          </div>
        </section>

        {/* Right side */}
        <section className="side-container">
          <div className="font-uploader">
            <FontUploader onFontSelected={handleFontSelectedRight} />
          </div>
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
          <div>
            <p>Font features detected: {fontFeatureOptionsRight.toString()}</p>
          </div>
          <div className="font-preview">
            {<FontPreview fontFile={selectedFontRight} side="right" lineHeight={lineHeightRight} />}
          </div>
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
