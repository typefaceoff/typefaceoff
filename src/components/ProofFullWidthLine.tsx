import SizingToken from './SizingToken';
import '../styles/ProofFullWidthLine.css';

export default function FullWidthLine(proofingText: string, pointSize: number, lineHeight: number) {
  return (
    <div className="full-width-line-container">
      {SizingToken(pointSize, pointSize * lineHeight)}
      <p
        className="full-width-line proof"
        contentEditable
        onInput={(e) => {
          const all = document.getElementsByClassName('proof');
          for (const elem of all) {
            elem.textContent = e.currentTarget.textContent;
          }
        }}
        style={{ fontSize: pointSize, lineHeight: lineHeight, maxHeight: pointSize * lineHeight }}
      >
        {proofingText}
      </p>
    </div>
  );
}
