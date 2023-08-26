import React, { useCallback, useState} from 'react';
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
  }, [onFontSelected]);

  const { getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    maxFiles: 1, 
    multiple: false
  });

  return (
    <form>
      <div {...getRootProps({ className: 'drop-area'})}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop here...</p> : <p>Drag and drop a font file here</p>}
      </div>
    </form>
  );
};

export default FontUploader;
