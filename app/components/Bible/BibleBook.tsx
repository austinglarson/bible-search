import { useState, useEffect } from 'react';
import type { Bible, Verse, BibleLocation } from '~/routes/bible';
import './Bible.css';

type BibleBookProps = {
  bibleData: Bible,
  bibleLocation: BibleLocation
}

export default function BibleBook({bibleData, bibleLocation}: BibleBookProps) {
  if (bibleLocation.chapter === 0) bibleLocation.chapter = 1;

  const verses = bibleData.verses.filter((verse) =>
    verse.book_name.toLowerCase() === bibleLocation.book.toLowerCase() &&
    (verse.chapter === bibleLocation.chapter)
  );

  //console.log(verses);
  /* let verses: Verse[] = [];

  for (let verse of bibleData.verses) {
    if (verse.book_name !== bibleLocation.book) {

    }
  }
  for (let i = 0; i < bibleData.verses.length; i++) {
    if (verse)
  } */

    /* const paragraphs = [];
    let currentParagraph = [];
    
    verses.forEach((verse, index) => {
      const text = verse.text;
      const parts = text.split('¶');
    
      parts.forEach((part, i) => {
        if (isNaN(part)) { // Check if duplicate verse number
          if (i > 0 && currentParagraph.length > 0) {
            // End current paragraph and push to paragraphs array
            paragraphs.push(
              <p key={`p${paragraphs.length}`}>
                {currentParagraph}
              </p>
            );
            currentParagraph = [];
          }
      
          currentParagraph.push(
            <span key={`v${index}-${i}`} id={`verse${verse.verse}`}>
              <sup>{verse.verse}</sup>
              {part}
            </span>
          );
        }
      });
    });
    
    // Push the final paragraph
    if (currentParagraph.length > 0) {
      paragraphs.push(
        <p key={`p${paragraphs.length}`}>
          {currentParagraph}
        </p>
      );
    }
  
    return (
      <div className="BibleChapter">
        <h1>{bibleLocation.book} {bibleLocation.chapter} <sup>{bibleLocation.version}</sup></h1>
        {paragraphs}
      </div>
    ) */

  // Scroll to specific verse
  useEffect(() => {
    const verseElement = document.getElementById(`verse${bibleLocation.verse}`);
    if (verseElement) {
      verseElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [bibleLocation.verse]);

  return (
    <div className="BibleChapter">
      <h1>{verses[0].book_name} {bibleLocation.chapter} <sup>{bibleLocation.version}</sup></h1>
      <p>
      { verses.map((verse, index) => (
        <span key={index} id={`verse${verse.verse}`} className={verse.verse === bibleLocation.verse ? 'selected' : ''}>
          <sup>{verse.verse}</sup>
          {verse.text + ' '}
        </span>
      ))}
      </p>
    </div>
  )
}