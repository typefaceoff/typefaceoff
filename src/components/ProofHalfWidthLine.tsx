import SizingToken from './SizingToken';
import '../styles/ProofHalfWidthLine.css';

export default function HalfWidthLine(proofingText: string, pointSize: number, lineHeight: number) {
  return (
    <div>
      {SizingToken(pointSize, pointSize * lineHeight)}
      <p
        className="half-width-line"
        style={{ fontSize: pointSize, lineHeight: lineHeight, maxHeight: 100 * lineHeight }}
      >
        {proofingText}
      </p>
    </div>
  );
}
