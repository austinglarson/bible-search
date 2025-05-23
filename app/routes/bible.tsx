import { useState, useEffect } from 'react';
import { useParams, useSearchParams  } from "react-router";
import type { Route } from './+types/bible';
import BibleBook from "~/components/Bible/BibleBook";

/* export async function loader({ params }: Route.LoaderArgs) {
  const bibleParams: BibleLocation = {
    version: params.version ?? 'net',
    book: params.book ?? 'Genesis',
    chapter: params.chapter ? parseInt(params.chapter) : 1,
    verse: params.verse ? parseInt(params.verse) : 1
  };
  return bibleParams;
} */

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Bible' },
    { name: 'description', content: 'Read the Bible.' },
  ];
}

export type Bible = {
  metadata: BibleMetaData;
  verses: Verse[];
};

export type BibleMetaData = {
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

export type BibleLocation = {
  version: string,
  book: string;
  chapter: number;
  verse: number;
}

async function getBible(bibleVersion: string): Promise<Bible | null> {
  try {
    const response = await fetch(`/${bibleVersion}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching files:", error);
    return null;
  }
}

export default function Bible() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [bibleData, setBibleData] = useState<Bible | null>(null);
  const [bibleLocation, setBibleLocation] = useState<BibleLocation>({
    version: searchParams.get('v') || 'net',
    book: params.book ? params.book.replaceAll('-', ' ') : 'Genesis',
    chapter: params.chapter ? parseInt(params.chapter) : 0,
    verse: params.verse ? parseInt(params.verse) : 0,
  });

  useEffect(() => {
    async function fetchBible() {
      const bible = await getBible(bibleLocation.version);
      setBibleData(bible);
    }
  
    fetchBible();
  }, []);

  return (
    <>
    <main>
      {!bibleData ? <p>Loading...</p> :
      <BibleBook bibleData={bibleData} bibleLocation={bibleLocation} />
      }
    </main>
    </>
  )
}