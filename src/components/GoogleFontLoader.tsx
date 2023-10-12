import React, { useState, useCallback } from 'react';
import axios from 'axios';
import '../styles/GoogleFontLoader.css';

const GoogleFontLoader: React.FC<{ onFontLoaded: (fontData: string) => void }> = ({
  onFontLoaded,
}) => {
  const [input, setInput] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleInputSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        // Check the input to see if it is a google url or a font name
        const googleFontUrl = isValidFontUrl(input)
          ? input
          : `https://fonts.googleapis.com/css2?family=${input}`;

        // Fetch font data using Axios
        const response = await axios.get(googleFontUrl, {
          responseType: 'arraybuffer',
        });

        const uint8Array = response.data;
        const decoder = new TextDecoder('utf-8');
        const fontData = decoder.decode(uint8Array);

        // Notify the parent component about the loaded font data
        onFontLoaded(fontData);
      } catch (error) {
        console.error('Error loading Google Font:', error);
        // Handle error loading font (e.g., show an error message to the user)
      }
    },
    [input, onFontLoaded]
  );

  return (
    <form className="google-font-form" onSubmit={handleInputSubmit}>
      <div className="google-font-bar">
        <input
          className="borderless-input"
          type="text"
          spellCheck="false"
          maxLength={40}
          value={input}
          onChange={handleInputChange}
          placeholder="Google font name or URL..."
        />
        <button className="submitButton" type="submit">
          Load
        </button>
      </div>
    </form>
  );
};

function isValidFontUrl(input: string): boolean {
  const fontUrlPrefix = 'https://fonts.googleapis.com/css2?family=';
  return input.startsWith(fontUrlPrefix);
}

export default GoogleFontLoader;
