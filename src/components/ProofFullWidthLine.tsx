export default function FullWidthLine(proofingText: string, pointSize: number, lineHeight: number) {
  return (
    <p
      className="full-width-line"
      style={{ fontSize: pointSize, lineHeight: lineHeight, maxHeight: pointSize * lineHeight }}
    >
      {proofingText}
    </p>
  );
}
