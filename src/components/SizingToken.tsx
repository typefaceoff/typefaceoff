import '../styles/SizingToken.css';

export default function SizingToken(pointSize: number, absoluteLineHeight: number) {
  return (
    <p className="sizing-token">
      {pointSize}/{absoluteLineHeight.toFixed(0)}
    </p>
  );
}
