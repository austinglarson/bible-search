import { useState, useEffect } from 'react';
import './BibleSearch.css';
import BibleSearchResults from './BibleSearchResults';

type Bible = {
  metadata: BibleMetaData;
  verses: Verse[];
};

type BibleMetaData = {
  name: string;
  shortname: string;
  module: string;
};

export type Verse = {
  bible_version? : string,
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
};

export function BibleSearch() {
  const [bibleData, setBibleData] = useState<Bible[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<Verse[]>([]);
  const [showAllVerses, setShowAllVerses] = useState(false);

  useEffect(() => {
    const fetchBibles = async () => {
      try {
        const filePaths = ['net.json', 'kjv.json', 'asv.json'];
        const promises = filePaths.map(path => fetch(path).then(response => response.json()));
        const results = await Promise.all(promises);
        setBibleData(results);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchBibles();
  }, []);

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchValue !== '') {
        setSearchResults(searchBibles(searchValue));
      } else {
        setSearchResults([]);
      }
    }, 100); // wait 100ms after typing

    return () => clearTimeout(timeout);
  }, [searchValue, bibleData]);  

  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  function searchBibles(searchText: string) {
    const pattern = new RegExp(searchText, 'i'); // Case-insensitive match
    const versesFound = new Set<string>(); // Set to store unique found verses by key
    const results: Verse[] = []; // Array to store unique verses

    setShowAllVerses(false);
    
    for (const bible of bibleData) {
      for (const verse of bible.verses) {
        // Check if the verse matches the search query (in text, book, or chapter:verse)
        const match =
          pattern.test(verse.text) ||
          pattern.test(verse.book_name) ||
          pattern.test(`${verse.chapter}:${verse.verse}`) ||
          pattern.test(`${verse.book_name} ${verse.chapter}:${verse.verse}`);
    
        if (match) {
          const uniqueKey = `${verse.book_name} ${verse.chapter}:${verse.verse}`;
          verse.bible_version = bible.metadata.module;
    
          if (!versesFound.has(uniqueKey)) {
            versesFound.add(uniqueKey); // Mark this verse as found
            results.push(verse); // Add the verse to the results
          }
        }
      }
    }

    return results;
  }

  return (
    <div className="BibleSearch">
      <h1>Bible Search</h1>
      <input type="text" value={searchValue} onChange={handleSearchInput} className="BibleSearchInput" placeholder="Search word, verse, chapter, book..." />

      {searchValue !== '' && <div className="BibleSearchResultData">{searchResults.length} verses found.</div>}

      {searchResults.length > 0 && <BibleSearchResults verses={searchResults.slice(0, 50)} searchValue={searchValue} />}
      {searchResults.length > 50 && !showAllVerses && <button className='button' onClick={() => setShowAllVerses(true)}>Show All</button>}
      {showAllVerses && <BibleSearchResults verses={searchResults.slice(51)} searchValue={searchValue} />}
    </div>
  )
}