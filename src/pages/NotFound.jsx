import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";

function NotFound() {
  return (
    <EmptyState
      title="Page not found"
      message="The page you are looking for does not exist."
    >
      <Link to="/" className="btn">
        Go to home
      </Link>
    </EmptyState>
  );
}

export default NotFound;
