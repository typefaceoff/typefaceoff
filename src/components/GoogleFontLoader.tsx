import React, { useState, useCallback } from 'react';
import axios from 'axios';
import '../styles/GoogleFontLoader.css';

const GoogleFontLoader: React.FC<{ onFontLoaded: (fontData: string) => void }> = ({ onFontLoaded }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleInputSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      try {

        // Check the input to see if it is a google url or a font name
        const googleFontUrl = isValidFontUrl(input) ? input : `https://fonts.googleapis.com/css2?family=${input}`;

        // Fetch font data using Axios
        const response = await axios.get(googleFontUrl, {
          responseType: 'arraybuffer',
        });
  
        const uint8Array = response.data;
        const decoder = new TextDecoder('utf-8');
        const fontData = decoder.decode(uint8Array);
  
        // Notify the parent component about the loaded font data
        onFontLoaded(fontData);
        console.log('Google Font ' + extractFontFamily(fontData) +' Loaded');
        console.log('Google font data:\n' + fontData);
      } catch (error) {
        console.error('Error loading Google Font:', error);
        // Handle error loading font (e.g., show an error message to the user)
      }
    },
    [input, onFontLoaded]
  );

  return (
    <form onSubmit={handleInputSubmit}>
      <input 
        className='borderless-input'
        type="text"
        spellCheck='false'
        value={input}
        onChange={handleInputChange}
        placeholder="Google Font Name or URL..."
      />
      <button className='submitButton' type="submit">Load</button>
    </form>
  );
};

function isValidFontUrl(input: string): boolean {
  const fontUrlPrefix = "https://fonts.googleapis.com/css2?family=";
  return input.startsWith(fontUrlPrefix);
}

function extractFontFamily(cssString: string): string | null {
  const fontFamilyRegex = /font-family:\s*['"]?([^"']*)['"]?;/;
  const match = cssString.match(fontFamilyRegex);
  if (match && match[1]) {
    return match[1];
  }
  return null; // Font family not found
}

export default GoogleFontLoader;