import SizingToken from './SizingToken';
import '../styles/ProofHalfWidthLine.css';
import { maxHeightMultiplier } from './constants';

export default function HalfWidthLine(proofingText: string, pointSize: number, lineHeight: number) {
  const updateProofingText = (e: React.FormEvent<HTMLParagraphElement>) => {
    const all = document.getElementsByClassName('proof');
    for (const elem of all) {
      elem.textContent = e.currentTarget.textContent;
    }
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: pointSize,
    lineHeight: lineHeight,
    maxHeight: maxHeightMultiplier * lineHeight,
  };

  return (
    <div>
      {SizingToken(pointSize, pointSize * lineHeight)}
      <p
        className="half-width-line proof"
        contentEditable
        onInput={updateProofingText}
        style={paragraphStyle}
      >
        {proofingText}
      </p>
    </div>
  );
}
