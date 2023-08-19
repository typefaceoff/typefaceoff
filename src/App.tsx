import { useState } from "react";
import "./App.css";
import FontUploader from "./components/FontUploader";
import FontPreviewLeft from "./components/FontPreviewLeft";
import FontPreviewRight from "./components/FontPreviewRight";

function App() {
  // State for the selected font on the left
  const [selectedFontLeft, setSelectedFontLeft] = useState<File | null>(null);

  // State for the selected font on the right
  const [selectedFontRight, setSelectedFontRight] = useState<File | null>(null);

  // Handler for when a font is selected on the left side
  const handleFontSelectedLeft = (selectedFonts: File[]) => {
    console.log("Selected Fonts (Left):", selectedFonts);

    // Set the selected font on the left to the last font in the selectedFonts array
    setSelectedFontLeft(selectedFonts[selectedFonts.length - 1]);
  };

  // Handler for when a font is selected on the right side
  const handleFontSelectedRight = (selectedFonts: File[]) => {
    console.log("Selected Fonts (Right):", selectedFonts);

    // Set the selected font on the right to the last font in the selectedFonts array
    setSelectedFontRight(selectedFonts[selectedFonts.length - 1]);
  };

  return (
    <>
      <h1>Welcome to TypeFaceOff!</h1>
      <p className="read-the-docs">Get started by uploading two fonts</p>
      <div className="battle-ground">
        {/* Left side */}
        <div>
          <FontUploader onFontSelected={handleFontSelectedLeft} />
          {selectedFontLeft && (
            <FontPreviewLeft
              fontFile={selectedFontLeft}
              text="Sample text for the font on the left!"
            />
          )}
          {!selectedFontLeft && <p>Sample text for the font on the left!</p>}
        </div>

        {/* Middle divider */}
        <div>
          <h2 className="vs">VS</h2>
        </div>

        {/* Right side */}
        <div>
          <FontUploader onFontSelected={handleFontSelectedRight} />
          {selectedFontRight && (
            <FontPreviewRight
              fontFile={selectedFontRight}
              text="Sample text for the font on the right!"
            />
          )}
          {!selectedFontRight && <p>Sample text for the font on the right!</p>}
        </div>
      </div>
    </>
  );
}

export default App;
