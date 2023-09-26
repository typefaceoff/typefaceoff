import '../styles/App.css';
import FontUploader from './FontUploader';
import FontPreview from './FontPreview';
import { BsGithub } from 'react-icons/bs';
import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  // Event handler to set a common text for all proof elements
  const setCommonText = () => {
    const all = document.getElementsByClassName('proof');
    for (const elem of all) {
      elem.textContent = `There was nothing so very remarkable in that; nor did Alice think it so very much out \n of the way to hear the Rabbit say to itself, “Oh dear! Oh dear! I shall be late!” (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually took a watch out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.`;
    }
  };


  return (
    <div className="app">
      <header>
        <h1>Welcome to Typefaceoff!</h1>
        <p className="subtitle">Get started by dropping two fonts</p>
        <button
          className="button"
          onClick={setCommonText}
        >
          Alice in Wonderland
        </button>
        <button
          className="button"
          onClick={() => {
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
          }}
        >
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
