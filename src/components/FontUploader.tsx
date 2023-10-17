import React, { useCallback, useState, useEffect } from 'react';
import '../styles/FontUploader.css';
import { useDropzone } from 'react-dropzone';
import { Typr } from 'typr-ts';

const FontUploader: React.FC<{
  onFontSelected: (selectedFont: File | null) => void;
  externalFontName: string;
}> = ({ onFontSelected, externalFontName }) => {
  const [, setSelectedFont] = useState<File | null>(null);
  const [, setFontPreview] = useState<string | null>(null);
  const [fontName, setFontName] = React.useState('Drop a font here');
  const [text, setText] = React.useState(' ');

  useEffect(() => {
    if (externalFontName != '') {
      setFontName(externalFontName);
      setText('drop another font here');
    }
    console.log('Effect called');
    console.log(externalFontName);
  }, [externalFontName]);

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      const allowedExtensions = ['.otf', '.ttf', '.woff', '.woff2'];
      const fontFiles = acceptedFiles.filter((file) => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        return allowedExtensions.includes(`.${extension}`);
      });
      if (fontFiles.length > 0) {
        const selectedFile = fontFiles[0];
        setSelectedFont(selectedFile);
        onFontSelected(selectedFile);
        setFontPreview(URL.createObjectURL(selectedFile));

        // Set text as font name uploaded by parsing font file buffer
        const buffer = selectedFile.arrayBuffer();
        buffer.then((data) => {
          const font = Typr.parse(data);
          const fullFontName = font.name.fullName + ' ' + font.name.fontSubfamily;
          setFontName(fullFontName);
        });
        setText('drop another font here');
      }
    },
    [onFontSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });

  return (
    <form>
      <div {...getRootProps({ className: 'drop-area' })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="font-name" style={{ opacity: 0.6 }}>
            Drop here
          </p>
        ) : (
          <div>
            <p className="font-name">{fontName}</p>
            <p className="descriptor">{text}</p>
          </div>
        )}
      </div>
    </form>
  );
};

export default FontUploader;
