import SizingToken from './SizingToken';
import '../styles/ProofCenteredLine.css';

export default function CenteredLine(
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
      <div className="centered-line-container">
        <p
          className="centered-line proof"
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
    <div className="centered-line-container">
      {SizingToken(pointSize, pointSize * lineHeight)}
      <p
        className="centered-line proof"
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
