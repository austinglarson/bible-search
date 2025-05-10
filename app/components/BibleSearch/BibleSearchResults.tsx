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
          <Link to={`/bible/${verse.book_name.toLowerCase().replaceAll(' ', '-')}/${verse.chapter}/${verse.verse}${(verse.bible_version !== 'net' ? `?v=${verse.bible_version}` : '')}`}>
            {verse.book_name} {verse.chapter}:{verse.verse} <sup>{verse.bible_version} </sup>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="10px" fill="gray"><path d="m243-240-51-51 405-405H240v-72h480v480h-72v-357L243-240Z"/></svg>
          </Link>
          <p>{highlightMatch(verse.text, searchValue)}</p>
        </div>
      ))}
    </div>
  )
}