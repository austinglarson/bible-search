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
        const filePaths = ['asv.json', 'kjv.json', 'net.json'];
        //const filePaths = ['kjv.json'];
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

  // Search through all versions but only show unique verses
  /* function searchBibles(searchText: string) {
    const maxResults = 50;
    const pattern = new RegExp(searchText, 'i'); // Case-insensitive match

    // Set to keep track of unique verses (by book/chapter/verse)
    const versesFound = new Set<string>();

    const results = bibleData.flatMap(bible =>
      bible.verses.filter(verse => {
        // Search the verse text, book name, and chapter:verse
        const match = pattern.test(verse.text) || 
                      pattern.test(verse.book_name) || 
                      pattern.test(`${verse.chapter}:${verse.verse}`);

        if (match) {
          // Create a unique key based on book, chapter, and verse
          const uniqueKey = `${verse.book_name} ${verse.chapter}:${verse.verse}`;

          if (!versesFound.has(uniqueKey)) {
            versesFound.add(uniqueKey); // Add to the seen set if this verse is not already included
            return true;  // Include this verse in the results
          }
        }

        return false; // Exclude this verse if it's already in results
      })
    );
  
    if (results.length >= maxResults) break;

    return results;
  } */

    //const maxResults = 50; // Maximum number of results

    // TODO: search bibles after 50 and so on when done typing
    function searchBibles(searchText: string) {
      const pattern = new RegExp(searchText, 'i'); // Case-insensitive match
      const versesFound = new Set<string>(); // To store unique verses
      const results: Verse[] = []; // To store the results

      setShowAllVerses(false);
    
      for (const bible of bibleData) {
        // Stop searching if we've already reached the max number of results
        //if (results.length >= 50 && results.length % 50 === 0) break;
    
        for (const verse of bible.verses) {
          // Check if the verse matches the search query (in text, book, or chapter:verse)
          const match =
            pattern.test(verse.text) ||
            pattern.test(verse.book_name) ||
            pattern.test(`${verse.chapter}:${verse.verse}`);
    
          if (match) {
            const uniqueKey = `${verse.book_name} ${verse.chapter}:${verse.verse}`;
            verse.bible_version = bible.metadata.module;
    
            if (!versesFound.has(uniqueKey)) {
              versesFound.add(uniqueKey); // Mark this verse as found
              results.push(verse); // Add the verse to the results
    
              // If we've reached the max results, stop searching further
              /* if (results.length >= 50 && results.length % 50 === 0) {
                break;
              } */
            }
          }
        }
      }

      console.log(results.length);
      return results; // Return the results array
    }

  return (
    <div className="BibleSearch">
      <input type="text" value={searchValue} onChange={handleSearchInput} className="BibleSearchInput" placeholder="Search word, verse, chapter, book..." />

      {searchValue !== '' && <div className="BibleSearchResultData">{searchResults.length} verses found.</div>}

      {searchResults.length > 0 && <BibleSearchResults verses={searchResults.slice(0, 50)} searchValue={searchValue} />}
      {searchResults.length > 50 && !showAllVerses && <button className='button' onClick={() => setShowAllVerses(true)}>Show All</button>}
      {showAllVerses && <BibleSearchResults verses={searchResults.slice(51)} searchValue={searchValue} />}
    </div>
  )
}