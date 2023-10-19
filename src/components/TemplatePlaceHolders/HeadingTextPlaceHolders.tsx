import '../../styles/FontTextPlaceholders.css';
import TitleLine from '../LineFormats/ProofTitleLine';

interface HeadingTextPlaceHoldersProps {
  readonly lineHeight: number;
}

export default function HeadingTextPlaceHolders({ lineHeight }: HeadingTextPlaceHoldersProps) {
  return (
    <div>
      <div className="template-single-columns">{TitleLine('Heading', 150, lineHeight, true)}</div>
      <div className="template-single-columns">{TitleLine('heading', 80, lineHeight, true)}</div>
    </div>
  );
}
