import '../styles/App.css';
import FontUploader from './FontUploader';
import Template from './Template';
import { BsGithub } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { proofingText, opentypeText } from './constants';
import opentype from 'opentype.js';
import FontFeaturesSetting from './FontFeaturesSetting';
import GoogleFontLoader from './GoogleFontLoader';
import postcss from 'postcss';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

function App() {
  const [darkMode, setDarkMode] = useState(false); // State variable for dark mode

  // useEffect to add/remove 'dark-mode' class based on the darkMode state
  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [darkMode]); // Run this effect whenever darkMode state changes

  // Current proof template
  const [selectedTemplate, setSelectedTemplate] = useState('Template');

  // State for the selected font on the left
  const [selectedFontLeft, setSelectedFontLeft] = useState<File | null>(null);

  // State for the google font declarations on the left
  const [googleFontLeft, setGoogleFontLeft] = useState<string | null>(null);

  // State for updating the font drop area with Google font name on the left
  const [googleFontNameLeft, setGoogleFontNameLeft] = useState<string>('');

  // State for the selected font on the right
  const [selectedFontRight, setSelectedFontRight] = useState<File | null>(null);

  // State for the google font declarations on the right
  const [googleFontRight, setGoogleFontRight] = useState<string | null>(null);

  // State for updating the font drop area with Google font name on the right
  const [googleFontNameRight, setGoogleFontNameRight] = useState<string>('');

  // State for the line height on the right
  const [lineHeightRight, setLineHeightRight] = useState<number>(1.5);

  // State for the line height on the left
  const [lineHeightLeft, setLineHeightLeft] = useState<number>(1.5);

  // Opentype feature option names from the gsub table of the font file on the left
  const [fontFeatureOptionsLeft, setFontFeatureOptionsLeft] = useState<string[]>([]);

  // Opentype feature option names from the gsub table of the font file on the right
  const [fontFeatureOptionsRight, setFontFeatureOptionsRight] = useState<string[]>([]);

  //Opentype feature current on/off settings for left font, initialised to all off
  const [fontSettingsLeft, setFontSettingsLeft] = useState<boolean[]>([]);

  //Opentype feature current on/off settings for false font, initialised to all off
  const [fontSettingsRight, setFontSettingsRight] = useState<boolean[]>([]);

  const handleFontSettingChangeLeft = (newSettings: boolean[]) => {
    setFontSettingsLeft(newSettings);
  };

  const handleFontSettingChangeRight = (newSettings: boolean[]) => {
    setFontSettingsRight(newSettings);
  };

  const handleFontSelected = (selectedFont: File | null, side: string) => {
    if (selectedFont != null) {
      const buffer = selectedFont.arrayBuffer();
      buffer.then((data) => {
        const otfFont = opentype.parse(data);
        const featureNames: string[] = Array.from(
          new Set(otfFont.tables.gsub.features.map((f: { tag: string }) => f.tag))
        ).map((name: unknown) => String(name));
        const featureSettings: boolean[] = featureNames.map(() => false);

        if (side === 'left') {
          setFontFeatureOptionsLeft(featureNames);
          setFontSettingsLeft(featureSettings);
        }
        if (side === 'right') {
          setFontFeatureOptionsRight(featureNames);
          setFontSettingsRight(featureSettings);
        }
      });
    }
  };

  // Handler for when a font is selected on the left side
  const handleFontSelectedLeft = (selectedFont: File | null) => {
    setSelectedFontLeft(selectedFont);
    setGoogleFontLeft(null);
    setGoogleFontName('', 'left');
    handleFontSelected(selectedFont, 'left');
  };

  // Handler for when a font is selected on the right side
  const handleFontSelectedRight = (selectedFont: File | null) => {
    setSelectedFontRight(selectedFont);
    setGoogleFontRight(null);
    setGoogleFontName('', 'right');
    handleFontSelected(selectedFont, 'right');
  };

  const setGoogleFontName = (fontData: string, side: string) => {
    let fontName = ' ';
    const parsedCss = postcss.parse(fontData);

    // Find the first font-family value
    parsedCss.walkAtRules('font-face', (atRule) => {
      atRule.walkDecls('font-family', (decl) => {
        fontName = decl.value.substring(1, decl.value.length - 1);
        return false; // Stop traversal after finding the first font-family
      });
    });

    console.log(fontName);
    switch (side) {
      case 'left':
        setGoogleFontNameLeft(fontName);
        break;
      case 'right':
        setGoogleFontNameRight(fontName);
        break;
    }
  };

  // Handler for when left Google font form is submitted
  const handleGoogleFontLeft = (fontData: string | null) => {
    if (fontData) {
      setSelectedFontLeft(null);
      setGoogleFontName(fontData, 'left');
      setGoogleFontLeft(fontData);
      // Clear features and options for Google fonts (not supported).
      setFontFeatureOptionsLeft([]);
      setFontSettingsLeft([]);
    }
  };

  // Handler for when right Google font form is submitted
  const handleGoogleFontRight = (fontData: string | null) => {
    if (fontData) {
      setSelectedFontRight(null);
      setGoogleFontName(fontData, 'right');
      setGoogleFontRight(fontData);
      // Clear features and options for Google fonts (not supported).
      setFontFeatureOptionsRight([]);
      setFontSettingsRight([]);
      console.log('hello');
    }
  };

  // Handles page print
  const handlePrint = () => {
    const css = '@page { size: A3 landscape; margin: 0; }',
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

  const handleProofingTemplateChange = (proofingTemplate: string) => {
    const dropdown = document.getElementById('dropbtn');
    if (dropdown) {
      dropdown.textContent = proofingTemplate;
      setSelectedTemplate(proofingTemplate);
    }
  };

  // Event handler to set a common text for all proof elements
  const setText = (text: string) => {
    const all = document.getElementsByClassName('proof');
    for (const elem of all) {
      elem.textContent = text;
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="app">
      <header>
        <h1 className="title">Welcome to Typefaceoff!</h1>
        <p className="subtitle">
          Get started by dropping two font files, or by loading Google fonts.
        </p>
        <button className="button" onClick={() => setText(proofingText)}>
          Alice in Wonderland
        </button>
        <button className="button" onClick={() => setText(opentypeText)}>
          Quick Brown Fox
        </button>
        <button
          className="button"
          onClick={() => {
            handlePrint();
          }}
        >
          Save previews as PDF
        </button>
        <div className="dropdown">
          <button id="dropbtn" className="dropbtn">
            Template
          </button>
          <div className="dropdown-content">
            <a
              onClick={() => {
                handleProofingTemplateChange('Template');
              }}
            >
              Template
            </a>
            <a
              onClick={() => {
                handleProofingTemplateChange('Article');
              }}
            >
              Article
            </a>
            <a
              onClick={() => {
                handleProofingTemplateChange('Research Paper');
              }}
            >
              Research Paper
            </a>
            <a
              onClick={() => {
                handleProofingTemplateChange('Poster');
              }}
            >
              Poster
            </a>
          </div>
        </div>
      </header>
      <main>
        {/* Left side */}
        <section className="side-container">
          <div className="font-uploader">
            <FontUploader
              onFontSelected={handleFontSelectedLeft}
              externalFontName={googleFontNameLeft}
            />
          </div>
          <div className="font-uploader">
            <GoogleFontLoader onFontLoaded={handleGoogleFontLeft} />
          </div>
          <div className="line-height-adjustment">
            <label htmlFor="lineHeightInputLeft">Line spacing: </label>
            <input
              className="lineHeightInput"
              type="number"
              id="lineHeightInputLeft"
              value={lineHeightLeft}
              min={0.95}
              max={1.9}
              step={0.05}
              onChange={(e) => setLineHeightLeft(parseFloat(e.target.value))}
            />
          </div>
          <div className="font-feature-checkboxes-container-left">
            {
              <FontFeaturesSetting
                fontFeatureOptions={fontFeatureOptionsLeft}
                fontSettings={fontSettingsLeft}
                fontSettingHandler={handleFontSettingChangeLeft}
              />
            }
          </div>
          <div className="template">
            {selectedTemplate === 'Template' && (
              <Template
                fontFile={selectedFontLeft}
                googleFontData={googleFontLeft}
                side="left"
                lineHeight={lineHeightLeft}
                fontFeatureOptions={fontFeatureOptionsLeft}
                fontSettings={fontSettingsLeft}
                template="Template"
              />
            )}
            {selectedTemplate === 'Article' && (
              <Template
                fontFile={selectedFontLeft}
                googleFontData={googleFontLeft}
                side="left"
                lineHeight={lineHeightLeft}
                fontFeatureOptions={fontFeatureOptionsLeft}
                fontSettings={fontSettingsLeft}
                template="Article"
              />
            )}
            {selectedTemplate === 'Research Paper' && (
              <Template
                fontFile={selectedFontLeft}
                googleFontData={googleFontLeft}
                side="left"
                lineHeight={lineHeightLeft}
                fontFeatureOptions={fontFeatureOptionsLeft}
                fontSettings={fontSettingsLeft}
                template="Template"
              />
            )}
            {selectedTemplate === 'Poster' && (
              <Template
                fontFile={selectedFontLeft}
                googleFontData={googleFontLeft}
                side="left"
                lineHeight={lineHeightLeft}
                fontFeatureOptions={fontFeatureOptionsLeft}
                fontSettings={fontSettingsLeft}
                template="Poster"
              />
            )}
          </div>
        </section>

        {/* Right side */}
        <section className="side-container">
          <div className="font-uploader">
            <FontUploader
              onFontSelected={handleFontSelectedRight}
              externalFontName={googleFontNameRight}
            />
          </div>
          <div className="font-uploader">
            <GoogleFontLoader onFontLoaded={handleGoogleFontRight} />
          </div>
          <div className="line-height-adjustment">
            <label htmlFor="lineHeightInputRight">Line spacing: </label>
            <input
              className="lineHeightInput"
              type="number"
              id="lineHeightInputRight"
              value={lineHeightRight}
              min={0.95}
              max={1.9}
              step={0.05}
              onChange={(e) => setLineHeightRight(parseFloat(e.target.value))}
            />
          </div>
          <div className="font-feature-checkboxes-container-Right">
            {
              <FontFeaturesSetting
                fontFeatureOptions={fontFeatureOptionsRight}
                fontSettings={fontSettingsRight}
                fontSettingHandler={handleFontSettingChangeRight}
              />
            }
          </div>
          <div className="template">
            {selectedTemplate === 'Template' && (
              <Template
                fontFile={selectedFontRight}
                googleFontData={googleFontRight}
                side="right"
                lineHeight={lineHeightRight}
                fontFeatureOptions={fontFeatureOptionsRight}
                fontSettings={fontSettingsRight}
                template="Template"
              />
            )}
            {selectedTemplate === 'Article' && (
              <Template
                fontFile={selectedFontRight}
                googleFontData={googleFontRight}
                side="right"
                lineHeight={lineHeightRight}
                fontFeatureOptions={fontFeatureOptionsRight}
                fontSettings={fontSettingsRight}
                template="Article"
              />
            )}
            {selectedTemplate === 'Research Paper' && (
              <Template
                fontFile={selectedFontRight}
                googleFontData={googleFontRight}
                side="right"
                lineHeight={lineHeightRight}
                fontFeatureOptions={fontFeatureOptionsRight}
                fontSettings={fontSettingsRight}
                template="Template"
              />
            )}
            {selectedTemplate === 'Poster' && (
              <Template
                fontFile={selectedFontRight}
                googleFontData={googleFontRight}
                side="right"
                lineHeight={lineHeightRight}
                fontFeatureOptions={fontFeatureOptionsRight}
                fontSettings={fontSettingsRight}
                template="Poster"
              />
            )}
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
