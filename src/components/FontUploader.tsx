import React, { useCallback, useState } from 'react';
import '../styles/FontUploader.css';
import { useDropzone } from 'react-dropzone';
import { Typr } from 'typr-ts';

const FontUploader: React.FC<{ onFontSelected: (selectedFont: File | null) => void }> = ({
  onFontSelected,
}) => {
  const [, setSelectedFont] = useState<File | null>(null);
  const [, setFontPreview] = useState<string | null>(null);
  const initialFontName = 'Drag and drop font files here';
  const [fontName, setFontName] = React.useState(initialFontName);
  const [text, setText] = React.useState(' ');

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
          <div>
            <p className="drop-text">Drop here</p>
          </div>
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
