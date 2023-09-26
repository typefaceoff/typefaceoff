import '../styles/App.css';
import FontUploader from './FontUploader';
import FontPreview from './FontPreview';
import { BsGithub } from 'react-icons/bs';
import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { proofingText } from './constants';
import opentype from 'opentype.js';

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

  // Handler for when a font is selected on the left side
  const handleFontSelectedLeft = (selectedFont: File | null) => {
    setSelectedFontLeft(selectedFont);
    if (selectedFont != null) {
      const buffer = selectedFont.arrayBuffer();
      buffer.then((data) => {
        const otfFont = opentype.parse(data);
        const featureNames = [
          ...Array.from(new Set(otfFont.tables.gsub.features.map((f: any) => f.tag))),
        ];
        setFontFeatureOptionsLeft(featureNames);
      });
    }
  };

  // Handler for when a font is selected on the right side
  const handleFontSelectedRight = (selectedFont: File | null) => {
    setSelectedFontRight(selectedFont);
    if (selectedFont != null) {
      const buffer = selectedFont.arrayBuffer();
      buffer.then((data) => {
        const otfFont = opentype.parse(data);
        const featureNames = [
          ...Array.from(new Set(otfFont.tables.gsub.features.map((f: any) => f.tag))),
        ];
        setFontFeatureOptionsRight(featureNames);
      });
    }
  };

  // Event handler to set a common text for all proof elements
  const setCommonText = () => {
    const all = document.getElementsByClassName('proof');
    for (const elem of all) {
      elem.textContent = proofingText;
    }
  };

  // Event handler to save the page as a PDF
  const savePageAsPDF = () => {
    html2canvas(document.body, {
      windowWidth: window.scrollX + window.outerWidth,
      windowHeight: window.scrollY + window.outerHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('l', 'mm');
      doc.addImage(
        imgData,
        'PNG',
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight()
      );
      doc.save('sample.pdf');
    });
  };

  return (
    <div className="app">
      <header>
        <h1>Welcome to Typefaceoff!</h1>
        <p className="subtitle">Get started by dropping two fonts</p>
        <button className="button" onClick={setCommonText}>
          Alice in Wonderland
        </button>
        <button className="button" onClick={savePageAsPDF}>
          Save page as PDF
        </button>
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
          <p>Font features detected: {fontFeatureOptionsLeft.toString()}</p>
          {<FontPreview fontFile={selectedFontLeft} side="left" lineHeight={lineHeightLeft} />}
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
          <p>Font features detected: {fontFeatureOptionsRight.toString()}</p>
          {<FontPreview fontFile={selectedFontRight} side="right" lineHeight={lineHeightRight} />}
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
