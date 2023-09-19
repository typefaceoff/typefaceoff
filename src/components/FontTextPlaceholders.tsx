import '../styles/FontTextPlaceholders.css';
import FullWidthLine from './ProofFullWidthLine';
import HalfWidthLine from './ProofHalfWidthLine';

interface FontTextPlaceholdersProps {
  proofingText: string;
  lineHeight: number;
}

export default function FontTextPlaceholders({
  proofingText,
  lineHeight,
}: FontTextPlaceholdersProps) {
  const defaultProofText = `There was nothing so very remarkable in that; nor did Alice think it so very much out \n of the way to hear the Rabbit say to itself, “Oh dear! Oh dear! I shall be late!” (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually took a watch out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.`;

  const displayPointSizes = [80, 60, 45, 33, 25, 18];
  if (proofingText === '') {
    proofingText = defaultProofText;
  }
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
