import { Outlet } from "react-router";
import TopNav from '~/components/TopNav/TopNav';
import Footer from '~/components/Footer';

export default function PageLayout() {
  return (
    <>
      <TopNav />
        <Outlet />
      <Footer />
    </>
  )
}