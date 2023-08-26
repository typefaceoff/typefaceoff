import React, { useCallback, useState, useMemo } from 'react';
import '../styles/FontUploader.css';
import { useDropzone } from 'react-dropzone';

const FontUploader: React.FC<{ onFontSelected: (selectedFont: File | null) => void }> = ({
  onFontSelected,
}) => {
  const [, setSelectedFont] = useState<File | null>(null);
  const [, setFontPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
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
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const focusedStyle = {
    borderColor: '#2196f3',
  };

  const style = useMemo(
    () => ({
      ...(isFocused ? focusedStyle : {}),
    }),
    [isFocused]
  );

  return (
    <form>
      <div {...getRootProps({ className: 'drop-area', style })}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop here...</p> : <p>Drag and drop a font file here</p>}
      </div>
    </form>
  );
};

export default FontUploader;
