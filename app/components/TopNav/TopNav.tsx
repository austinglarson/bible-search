import { Link } from "react-router";
import './TopNav.scss';

export default function TopNav() {
  return (
    <div className="TopNav">
      <nav>
        <Link to="/">Search</Link>
        <Link to="/bible">Bible</Link>
      </nav>
    </div>
  )
}