import '../../styles/FontTextPlaceholders.css';
import CenteredLine from '../LineFormats/ProofCenteredLine';

interface HeadingTextPlaceHoldersProps {
  readonly lineHeight: number;
}

export default function HeadingTextPlaceHolders({ lineHeight }: HeadingTextPlaceHoldersProps) {
  return (
    <div>
      <div className="template-single-columns">
        {CenteredLine('Heading', 150, lineHeight, false)}
      </div>
      <div className="template-single-columns">
        {CenteredLine('heading', 80, lineHeight, false)}
      </div>
    </div>
  );
}
