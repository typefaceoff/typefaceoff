import '../../styles/FontTextPlaceholders.css';
import HalfWidthLine from '../LineFormats/ProofHalfWidthLine';
import CenteredLine from '../LineFormats/ProofCenteredLine';
import {
  posterText,
  posterTitle,
  posterActorOne,
  posterActorTwo,
  posterInfo,
  posterTime,
} from '../constants';

interface PosterTextPlaceholdersProps {
  readonly lineHeight: number;
}

export default function PosterTextPlaceholders({ lineHeight }: PosterTextPlaceholdersProps) {
  const displayPointSizes = [30, 70, 25, 15, 20];

  return (
    <div>
      <div className="template-double-columns">
        {HalfWidthLine(posterActorOne, displayPointSizes[4], lineHeight, false)}
        {HalfWidthLine(posterActorTwo, displayPointSizes[4], lineHeight, false)}
      </div>
      <div className="template-single-columns">
        {CenteredLine(posterTitle, displayPointSizes[1], lineHeight, false)}
      </div>
      <div className="template-single-column">
        {CenteredLine(posterText, displayPointSizes[0], 1.5, false)}
      </div>
      <div className="template-double-columns">
        {HalfWidthLine(posterInfo, displayPointSizes[3], lineHeight, false)}
        {HalfWidthLine(posterInfo, displayPointSizes[3], lineHeight, false)}
      </div>
      <div className="template-single-columns">
        {CenteredLine(posterTime, displayPointSizes[2], lineHeight, false)}
      </div>
    </div>
  );
}
