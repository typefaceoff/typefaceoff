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
          for (let i = 0; i < all.length; i++) {
            const element = all[i];
            element.textContent = e.currentTarget.textContent;
          }
        }}
        style={{ fontSize: pointSize, lineHeight: lineHeight, maxHeight: pointSize * lineHeight }}
      >
        {proofingText}
      </p>
    </div>
  );
}
