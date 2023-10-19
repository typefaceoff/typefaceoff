import SizingToken from '../SizingToken';
import '../../styles/ProofHalfWidthLine.css';
import { maxHeightMultiplier } from '../constants';

export default function HalfWidthLine(
  proofingText: string,
  pointSize: number,
  lineHeight: number,
  sizingToken = true
) {
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

  if (!sizingToken) {
    return (
      <div className="half-width-line-container">
        <p
          className="half-width-line proof"
          contentEditable
          spellCheck="false"
          onInput={updateProofingText}
          style={paragraphStyle}
        >
          {proofingText}
        </p>
      </div>
    );
  }

  return (
    <div className="half-width-line-container">
      {SizingToken(pointSize, pointSize * lineHeight)}
      <p
        className="half-width-line proof"
        contentEditable
        spellCheck="false"
        onInput={updateProofingText}
        style={paragraphStyle}
      >
        {proofingText}
      </p>
    </div>
  );
}
