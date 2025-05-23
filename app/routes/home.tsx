import type { Route } from "./+types/home";
import BibleSearch from "~/components/BibleSearch/BibleSearch";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bible Search" },
    { name: "description", content: "Search the Bible by word, chapter, or verse." },
  ];
}

export default function Home() {
  return (
    <>
    <main>
      <BibleSearch />
    </main>
    </>
  )
}