import SizingToken from './SizingToken';
import '../styles/ProofHalfWidthLine.css';

export default function HalfWidthLine(proofingText: string, pointSize: number, lineHeight: number) {
  return (
    <div className="half-width-line-container">
      {SizingToken(pointSize, pointSize * lineHeight)}
      <p className="half-width-line" style={{ fontSize: pointSize, lineHeight: lineHeight }}>
        {proofingText}
      </p>
    </div>
  );
}
