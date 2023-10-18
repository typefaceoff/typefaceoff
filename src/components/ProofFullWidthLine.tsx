import SizingToken from './SizingToken';
import '../styles/ProofFullWidthLine.css';

export default function FullWidthLine(
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
    maxHeight: pointSize * lineHeight,
  };

  if (!sizingToken) {
    return (
      <div className="full-width-line-container">
        <p
          className="full-width-line proof"
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
    <div className="full-width-line-container">
      {SizingToken(pointSize, pointSize * lineHeight)}
      <p
        className="full-width-line proof"
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
