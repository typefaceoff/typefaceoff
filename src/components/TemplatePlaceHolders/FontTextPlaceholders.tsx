import '../../styles/FontTextPlaceholders.css';
import FullWidthLine from '../LineFormats/ProofFullWidthLine';
import HalfWidthLine from '../LineFormats/ProofHalfWidthLine';
import { proofingText } from '../constants';

interface FontTextPlaceholdersProps {
  lineHeight: number;
}

export default function FontTextPlaceholders({ lineHeight }: FontTextPlaceholdersProps) {
  const displayPointSizes = [80, 60, 45, 33, 25, 18];

  return (
    <div>
      <div className="template-single-column">
        {FullWidthLine(proofingText, displayPointSizes[0], 1.5)}
        {FullWidthLine(proofingText, displayPointSizes[1], 1.5)}
        {FullWidthLine(proofingText, displayPointSizes[2], 1.5)}
        {FullWidthLine(proofingText, displayPointSizes[3], 1.5)}
      </div>
      <div className="template-double-columns">
        {HalfWidthLine(proofingText, displayPointSizes[4], lineHeight)}
        {HalfWidthLine(proofingText, displayPointSizes[5], lineHeight)}
      </div>
    </div>
  );
}
