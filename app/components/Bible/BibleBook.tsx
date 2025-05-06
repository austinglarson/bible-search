import { useState, useEffect } from 'react';
import type { Bible, Verse, BibleLocation } from '~/routes/bible';
import './Bible.css';

type BibleBookProps = {
  bibleData: Bible,
  bibleLocation: BibleLocation
}

export default function BibleBook({bibleData, bibleLocation}: BibleBookProps) {
  console.log(bibleData);
  const verses = bibleData.verses.filter((verse) =>
    verse.book_name === bibleLocation.book &&
    verse.chapter === bibleLocation.chapter
  );
  /* let verses: Verse[] = [];

  for (let verse of bibleData.verses) {
    if (verse.book_name !== bibleLocation.book) {

    }
  }
  for (let i = 0; i < bibleData.verses.length; i++) {
    if (verse)
  } */

  return (
    <div className="BibleChapter">
      <h1>{bibleLocation.book} {bibleLocation.chapter}</h1>
      <p>
      { verses.map((verse, index) => (
        <span key={index}>
          <sup>{verse.verse}</sup>
          {verse.text}
        </span>
      ))}
      </p>
    </div>
  )
}