import SizingToken from './SizingToken';
import '../styles/ProofHalfWidthLine.css';

export default function HalfWidthLine(proofingText: string, pointSize: number, lineHeight: number) {
  const updateProofingText = (e: React.FormEvent<HTMLParagraphElement>) => {
    const all = document.getElementsByClassName('proof');
    for (const elem of all) {
      elem.textContent = e.currentTarget.textContent;
    }
  };


  return (
    <div>
      {SizingToken(pointSize, pointSize * lineHeight)}
      <p
        className="half-width-line proof"
        contentEditable
        onInput={updateProofingText}
        style={{ fontSize: pointSize, lineHeight: lineHeight, maxHeight: 100 * lineHeight }}
      >
        {proofingText}
      </p>
    </div>
  );
}
