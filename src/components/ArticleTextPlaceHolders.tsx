import '../styles/FontTextPlaceholders.css';
import FullWidthLine from './ProofFullWidthLine';
import HalfWidthLine from './ProofHalfWidthLine';
import { articleText, articleTitle, articleSubTitle, articleAuthorLine } from './constants';

interface ArticleTextPlaceholdersProps {
  lineHeight: number;
}

export default function ArticleTextPlaceholders({ lineHeight }: ArticleTextPlaceholdersProps) {
  const displayPointSizes = [30, 70, 25, 15, 20];

  return (
    <div>
      <div className="template-single-column">
        {FullWidthLine(articleText, displayPointSizes[0], lineHeight, false)}
      </div>
      <div className="template-double-columns">
        {HalfWidthLine(articleTitle, displayPointSizes[1], lineHeight, false)}
        {HalfWidthLine(articleSubTitle, displayPointSizes[2], lineHeight, false)}
      </div>
      <div className="template-single-column">
        {FullWidthLine(articleAuthorLine, displayPointSizes[3], 1.5, false)}
      </div>
      <div className="template-double-columns">
        {HalfWidthLine(articleText, displayPointSizes[4], lineHeight, false)}
        {HalfWidthLine(articleText, displayPointSizes[4], lineHeight, false)}
      </div>
      <div className="template-double-columns">
        {HalfWidthLine(articleText, displayPointSizes[4], lineHeight, false)}
        {HalfWidthLine(articleText, displayPointSizes[4], lineHeight, false)}
      </div>
      <div className="template-double-columns">
        {HalfWidthLine(articleText, displayPointSizes[4], lineHeight, false)}
        {HalfWidthLine(articleText, displayPointSizes[4], lineHeight, false)}
      </div>
    </div>
  );
}
