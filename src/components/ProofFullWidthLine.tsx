import SizingToken from './SizingToken';

export default function FullWidthLine(proofingText: string, pointSize: number, lineHeight: number) {
  return (
    <div className="full-width-line-container">
      {SizingToken(pointSize, pointSize * lineHeight)}
      <p
        className="full-width-line"
        style={{ fontSize: pointSize, lineHeight: lineHeight, maxHeight: pointSize * lineHeight }}
      >
        {proofingText}
      </p>
    </div>
  );
}
