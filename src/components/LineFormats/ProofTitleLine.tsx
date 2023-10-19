import SizingToken from '../SizingToken';
import '../../styles/ProofTitleLine.css';

export default function TitleLine(
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
      <div className="title-line-container">
        <p
          className="title-line proof"
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
    <div className="title-line-container">
      {SizingToken(pointSize, pointSize * lineHeight)}
      <p
        className="title-line proof"
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
