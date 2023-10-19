import '../../styles/FontTextPlaceholders.css';
import FullWidthLine from '../LineFormats/ProofFullWidthLine';

interface HeadingTextPlaceHoldersProps {
  readonly lineHeight: number;
}

export default function HeadingTextPlaceHolders({ lineHeight }: HeadingTextPlaceHoldersProps) {
  return (
    <div>
      <div className="template-single-columns">
        {FullWidthLine('Heading', 150, lineHeight, true)}
      </div>
      <div className="template-single-columns">
        {FullWidthLine('heading', 80, lineHeight, true)}
      </div>
    </div>
  );
}
