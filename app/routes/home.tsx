import type { Route } from "./+types/home";
import { BibleSearch } from "~/components/BibleSearch/BibleSearch";
import Footer from '~/components/Footer';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
    <main>
      <h1>Bible Search</h1>
      <BibleSearch />
    </main>
    <Footer />
    </>
  )
}