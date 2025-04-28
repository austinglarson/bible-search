import type { Verse } from './BibleSearch';
import { useLayoutEffect } from 'react';
import { Link } from 'react-router';

type BibleSearchResultsProps = {
  verses: Verse[];
  searchValue: string;
};

function highlightMatch(text: string, textToMatch: string): React.ReactNode {
  if (!textToMatch) return text;

  const regex = new RegExp(`(${textToMatch})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : part
  );
}

export default function BibleSearchResults({verses, searchValue}: BibleSearchResultsProps) {
  useLayoutEffect(() => {
    console.log('All search result elements are in the DOM now!');
  }, [verses]);

  return (
    <div className="BibleSearchResults">
      {verses.map((verse, index) => (
        <div key={index} className="BibleVerse">
          <Link to="">{verse.book_name} {verse.chapter}:{verse.verse} <sup>{verse.bible_version}</sup></Link>
          <p>{highlightMatch(verse.text, searchValue)}</p>
        </div>
      ))}
    </div>
  )
}